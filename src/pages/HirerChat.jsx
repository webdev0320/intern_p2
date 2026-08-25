import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
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

const HirerChat = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const myNumericId = localStorage.getItem("user_id");
  const myFirebaseKey = localStorage.getItem("firebase_key");

  const recieverData = offerId.split('-');

  let workerNumericId = recieverData[0];
  let hirerNumericId = recieverData[1];

  if (userId == recieverData[0]) {
    hirerNumericId = recieverData[0];
    workerNumericId = recieverData[1];
  }
  if (userId == recieverData[1]) {
    hirerNumericId = recieverData[1];
    workerNumericId = recieverData[0];
  }

  const [receiver, setReceiver] = useState(null);
  const [sender, setSender] = useState(null);
  const [recFirebaseId, setRecFirebaseId] = useState('');
  const [senderFirebaseId, setSenderFirebaseId] = useState('');
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      try {
        const usersRef = collection(db, COLLECTIONS.USERS, "StoredUsers", "Worker");
        const q = query(usersRef, where("userId", "==", workerNumericId.toString()));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setRecFirebaseId(querySnapshot.docs[0].id);
          setReceiver(querySnapshot.docs[0].data());
        }
      } catch (err) {
        console.error("Error fetching worker:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkerProfile();
  }, [workerNumericId]);

  useEffect(() => {
    const fetchHirerProfile = async () => {
      try {
        const usersRef = collection(db, COLLECTIONS.USERS, "StoredUsers", "Hirer");
        const q = query(usersRef, where("userId", "==", hirerNumericId.toString()));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setSenderFirebaseId(querySnapshot.docs[0].id);
          setSender(querySnapshot.docs[0].data());
        }
      } catch (err) {
        console.error("Error fetching hirer:", err);
      }
    };
    fetchHirerProfile();
  }, [hirerNumericId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!offerId) return;
    const q = query(
      collection(db, "chatStaging", offerId, "userChats"),
      orderBy(FIELDS.TIMESTAMP, "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
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
    if (!newMessage.trim() || !offerId || !recFirebaseId || !senderFirebaseId) return;

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
        senderId: senderFirebaseId,
        senderName: sender?.name,
        senderImage: sender?.profileImage || "",
        receiverId: recFirebaseId,
        receiverName: receiver?.name,
        receiverImage: receiver?.profileImage || "",
        participantIds: [senderFirebaseId, recFirebaseId],
        [senderFirebaseId]: 0,
        [recFirebaseId]: 1,
      }, { merge: true });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  if (loading || !receiver) return <div className="p-10 text-center">Loading Chat...</div>;

  return (
    <div className="fixed top-[65px] inset-x-0 bottom-0 flex flex-col bg-white z-[40]">
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3 shadow-sm shrink-0">
        <div className="w-10 h-10 rounded-full bg-orange-100 overflow-hidden border shrink-0">
          <img src={receiver.profileImage || receiver.u_image} className="w-full h-full object-cover" alt="" />
          {!receiver.profileImage && <div className="w-full h-full flex items-center justify-center text-orange-500 font-bold">{receiver.name?.charAt(0)}</div>}
        </div>
        <div className="font-bold text-gray-900 truncate">{receiver.name}</div>
      </div>

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

      <div className="p-4 bg-white border-t pb-[90px] shrink-0">
        <form onSubmit={handleSendMessage} className="flex gap-2 items-center max-w-5xl mx-auto">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-white border border-orange-500 p-3 px-5 rounded-full outline-none text-sm focus:ring-2 focus:ring-orange-600 transition-all"
            placeholder="Type a message..."
          />
          <button type="submit" disabled={!newMessage.trim()} className="bg-orange-600 text-white p-3 rounded-full shrink-0 disabled:opacity-50">
            <FaPaperPlane size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default HirerChat;
