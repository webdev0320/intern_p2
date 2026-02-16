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
} from "firebase/firestore";
import { COLLECTIONS, FIELDS } from "../firebaseConstants";

const HirerChat = () => {
  const { offerId } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();

  const [receiver, setReceiver] = useState(() => {
    if (location.state?.receiverData) {
      localStorage.setItem(`cached_user_${offerId}`, JSON.stringify(location.state.receiverData));
      return location.state.receiverData;
    }
    const saved = localStorage.getItem(`cached_user_${offerId}`);
    return saved ? JSON.parse(saved) : null;
  });

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
        [FIELDS.LAST_MESSAGE]: messageText,
        [FIELDS.TIMESTAMP]: serverTimestamp(),
        [FIELDS.CHAT_ID]: offerId,
        [myFirebaseKey]: 0,
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
    /* ADJUSTED: top offset to match header and z-index for sidebar support */
    <div className="fixed top-[65px] inset-x-0 bottom-0 flex flex-col bg-white z-[40]">
      
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3 shadow-sm z-[60] shrink-0">
        <div className="w-10 h-10 rounded-full bg-orange-100 overflow-hidden border shrink-0">
             <img src={receiver.u_image} className="w-full h-full object-cover" alt="" />
             <div className="w-full h-full flex items-center justify-center text-orange-500 font-bold">
               {receiver.name?.charAt(0)}
             </div>
        </div>
        <div className="font-bold text-gray-900 truncate">{receiver.name}</div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fa]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg[FIELDS.SENDER_ID] === myFirebaseKey ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-2xl max-w-[75%] shadow-sm ${
                msg[FIELDS.SENDER_ID] === myFirebaseKey 
                  ? "bg-orange-600 text-white rounded-tr-none" 
                  : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
              }`}>
              {msg[FIELDS.MESSAGE]}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Adjusted for Bottom Navigation and Styled with orange Border */}
      <div className="p-4 bg-white border-t pb-[90px] shrink-0"> 
        <form onSubmit={handleSendMessage} className="flex gap-2 items-center max-w-5xl mx-auto">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-white border border-orange-500 p-3 px-5 rounded-full outline-none text-sm focus:ring-2 focus:ring-orange-600 transition-all"
            placeholder="Type a message..."
          />
          <button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="bg-orange-600 text-white p-3 rounded-full shrink-0 disabled:opacity-50"
          >
            <FaPaperPlane size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HirerChat;