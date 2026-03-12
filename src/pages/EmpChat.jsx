import React, { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaPaperPlane, FaChevronLeft } from "react-icons/fa";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  serverTimestamp,
  doc,
  setDoc,
  orderBy,
  where,
  getDocs
} from "firebase/firestore";
import { COLLECTIONS, FIELDS } from "../firebaseConstants";

const EmpChat = () => {
  const { offerId } = useParams(); 
  let recieverData = offerId.split('-');
  const userId = localStorage.getItem("user_id"); // current employee ID
  const location = useLocation();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const IMAGE_BASE_URL = import.meta.env.VITE_API_IMAGE_BASE_URL;
  const [receiver, setReceiver] = useState(null);
  const [sender, setSender] = useState(null);
  const [loading, setLoading] = useState(true);


  let receiverId = recieverData[1];
  let senderId = recieverData[0];  

    if(userId==recieverData[0]){
      senderId = recieverData[0];
      receiverId = recieverData[1];
    }
    if(userId==recieverData[1]){
      senderId = recieverData[1];
      receiverId = recieverData[0];
    }  


console.log(receiverId);

  
const [recFirebaseId, setRecFirebaseId] = useState('');
const [senderFirebaseId, setSenderFirebaseId] = useState('');
useEffect(() => {
  const fetchReceiverProfile = async () => {
    // 1. Capture the current value of receiverId
    const targetId = receiverId;
    //console.log(receiverId);
    
    //console.log("Starting fetch for ID:", targetId); // Should show 83

    if (!targetId) {
      console.log("No targetId found, skipping fetch.");
      setLoading(false);
      return;
    }

    try {
      // 2. Reference the collection
      // IMPORTANT: Double check if COLLECTIONS.USERS is "Users" or "users"
      const usersRef = collection(db, COLLECTIONS.USERS, "StoredUsers", "Hirer");

      // 3. Create the query using targetId (stringified just in case)
      const q = query(usersRef, where("userId", "==", targetId.toString()));

      // 4. Execute the query
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
         
        setRecFirebaseId(querySnapshot.docs[0].id); // Save to state
/*        console.log(recFirebaseId); */
        const userData = querySnapshot.docs[0].data();
        //console.log("Success! User Found:", userData);
        
        // Update your state here so the UI can use the data
        setReceiver(userData); 
      } else {
        console.warn("Query ran but no document matches userId:", targetId);
      }
    } catch (err) {
      console.error("Firestore Query Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchReceiverProfile();
}, [receiverId]); // Only need receiverId here to trigger the fetch


//console.log(receiver);
  

useEffect(() => {
  const fetchSenderProfile = async () => {
    // 1. Capture the current value of senderId
    const targetId = senderId;
    //console.log(senderId);
    
    //console.log("Starting fetch for ID:", targetId); // Should show 83

    if (!targetId) {
      console.log("No targetId found, skipping fetch.");
      setLoading(false);
      return;
    }

    try {
      // 2. Reference the collection
      // IMPORTANT: Double check if COLLECTIONS.USERS is "Users" or "users"
      const usersRef = collection(db, COLLECTIONS.USERS, "StoredUsers", "Worker");

      // 3. Create the query using targetId (stringified just in case)
      const q = query(usersRef, where("userId", "==", targetId.toString()));

      // 4. Execute the query
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setSenderFirebaseId(querySnapshot.docs[0].id); // Save to state
        const userData = querySnapshot.docs[0].data();
        //console.log("Success! User Found:", userData);
        
        // Update your state here so the UI can use the data
        setSender(userData); 
      } else {
        console.warn("Query ran but no document matches userId:", targetId);
      }
    } catch (err) {
      console.error("Firestore Query Failed:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchSenderProfile();
}, [senderId]); // Only need receiverId here to trigger the fetch


  //console.log(sender);
  const myNumericId = localStorage.getItem("user_id");
  const myFirebaseKey = localStorage.getItem("firebase_key");

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (!offerId) return;
    const q = query(
      collection(db, "chatStaging", offerId, "userChats"),
      orderBy(FIELDS.TIMESTAMP, "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, [offerId]);

  useEffect(() => {
    if (!offerId || !myFirebaseKey) return;
    setDoc(doc(db, COLLECTIONS.CONVERSATIONS, offerId), { [myFirebaseKey]: 0 }, { merge: true });
  }, [offerId, myFirebaseKey]);

  const handleSendMessage = async (e) => {
    console.log(recFirebaseId);
    e.preventDefault();
    if (!newMessage.trim() || !offerId) return;

    const messageText = newMessage;
    setNewMessage("");

    try {
      await addDoc(collection(db, "chatStaging", offerId, "userChats"), {
        [FIELDS.SENDER_ID]: myFirebaseKey,
        [FIELDS.MESSAGE]: messageText,
        [FIELDS.TIMESTAMP]: serverTimestamp(),
        senderNumericId: myNumericId,
      });

   await setDoc(doc(db, COLLECTIONS.CONVERSATIONS, offerId), {
      // 1. Basic Chat Info
      [FIELDS.LAST_MESSAGE]: messageText,
      [FIELDS.TIMESTAMP]: serverTimestamp(),
      [FIELDS.CHAT_ID]: offerId,

      // 2. Participant IDs (Crucial for the 'Hirer' query we discussed)
      //participantIds: [senderFirebaseId, recFirebaseId],

      // 3. Sender Metadata (Matches Android Structure)
      senderId: senderFirebaseId,
      senderName: sender.name,
      senderImage: sender.image || "",

      // 4. Receiver Metadata (Matches Android Structure)
      receiverId: recFirebaseId,
      receiverName: receiver.name,
      receiverImage: receiver.image || "",

      // 5. The Dynamic Key (The '0' or '1' your Android app uses)
      [senderFirebaseId]: 0, 
      [recFirebaseId]: 1, // Usually, the other person gets '1' for unread status
      
    }, { merge: true });






    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  if (!receiver) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-6 text-center">
        <p className="text-orange-500 mb-4">Chat context lost. Please return to messages.</p>
        <button onClick={() => navigate(-1)} className="bg-black text-white px-6 py-2 rounded-full">Go Back</button>
      </div>
    );
  }

 return (
  /* 1. Changed inset-0 to specific bounds. 
     2. Set z-index to 40 (Lower than typical Sidebars which are 50-100).
     3. Added top offset to match your iyouwork header height.
  */
  <div className="fixed top-[72px] inset-x-0 bottom-0 flex flex-col bg-white z-[40]">
    
    {/* Chat Header - shrink-0 prevents it from collapsing */}
    <div className="bg-white border-b px-4 py-3 flex items-center gap-3 shadow-sm shrink-0">
      
      <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden border shrink-0">
            <img src={receiver.u_image} className="w-full h-full object-cover" alt="" />
           <div className="w-full h-full flex items-center justify-center text-blue-500 font-bold">
             {receiver.name?.charAt(0)}
           </div>
      </div>
      
      <div className="flex flex-col min-w-0">
        <div className="font-bold text-gray-900 truncate">{receiver.name}</div>
        <div className="text-[10px] text-green-500 font-bold uppercase">Online</div>
      </div>
    </div>

    {/* Messages Area - flex-1 takes up the remaining middle space */}
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fa]">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg[FIELDS.SENDER_ID] === myFirebaseKey ? "justify-end" : "justify-start"}`}>
          <div className={`px-4 py-2 rounded-2xl max-w-[75%] shadow-sm break-words ${
              msg[FIELDS.SENDER_ID] === myFirebaseKey 
                ? "bg-blue-600 text-white rounded-tr-none" 
                : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
            }`}>
            {msg[FIELDS.MESSAGE]}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>

    {/* Input Area - pb-[90px] lifts it above your Bottom Navigation bar */}
    <div className="p-4 bg-white border-t pb-[90px] shrink-0"> 
      <form onSubmit={handleSendMessage} className="flex gap-2 items-center max-w-5xl mx-auto">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-white border border-blue-500 p-3 px-5 rounded-full outline-none text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
          placeholder="Type a message..."
        />
        <button 
          type="submit" 
          disabled={!newMessage.trim()}
          className="bg-blue-600 text-white p-3 rounded-full shrink-0 disabled:opacity-50"
        >
          <FaPaperPlane size={14} />
        </button>
      </form>
    </div>
  </div>
);
};

export default EmpChat;