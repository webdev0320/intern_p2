import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { COLLECTIONS, FIELDS } from "../firebaseConstants";

const HirerMessages = () => {
  const navigate = useNavigate();
  const firebaseKey = localStorage.getItem("firebase_key");

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const IMAGE_BASE_URL = import.meta.env.VITE_API_IMAGE_BASE_URL;
  useEffect(() => {
    if (!firebaseKey) {
      setLoading(false);
      return;
    }

    const conversationsRef = collection(db, COLLECTIONS.CONVERSATIONS);
    const convMap = new Map();

    const updateState = (snapshot) => {
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const isSender = data[FIELDS.SENDER_ID] === firebaseKey;

        const contactName = isSender ? data[FIELDS.RECEIVER_NAME] : data[FIELDS.SENDER_NAME];
        const contactImage = isSender ? data[FIELDS.RECEIVER_IMAGE] : data[FIELDS.SENDER_IMAGE];
        const contactId = isSender ? data[FIELDS.RECEIVER_ID] : data[FIELDS.SENDER_ID];

        convMap.set(doc.id, {
          id: doc.id,
          name: contactName || "Unknown User",
          image: contactImage || null,
          contactId: contactId,
          lastMessage: data[FIELDS.LAST_MESSAGE] || "",
          timestamp: data[FIELDS.TIMESTAMP]?.seconds || 0,
        });
      });

      const sorted = Array.from(convMap.values()).sort((a, b) => b.timestamp - a.timestamp);
      setConversations(sorted);
      setLoading(false);
    };

    const qSender = query(conversationsRef, where(FIELDS.SENDER_ID, "==", firebaseKey));
    const qReceiver = query(conversationsRef, where(FIELDS.RECEIVER_ID, "==", firebaseKey));
    const unsubSender = onSnapshot(qSender, updateState);
    const unsubReceiver = onSnapshot(qReceiver, updateState);

    return () => {
      unsubSender();
      unsubReceiver();
    };
  }, [firebaseKey]);

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-white text-gray-400">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 bg-gray-200 rounded-full mb-2"></div>
        <p>Loading Conversations...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Messages</h1>
      </div>
      
      <div className="w-full">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center pt-20 text-gray-400 p-6">
            <p className="text-lg">No conversations yet.</p>
          </div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => navigate(`/emp-chat/${conv.id}`, {
                state: {
                  receiverData: {
                    name: conv.name,
                    u_image: conv.image || null
                  }
                }
              })
            }
              className="flex items-center px-6 py-5 border-b border-gray-50 hover:bg-gray-50/80 active:bg-gray-100 transition-all cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={conv.image || "/avatar-placeholder.png"}
                  alt=""
                  className="w-16 h-16 rounded-full border border-gray-100 object-cover shadow-sm group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="ml-5 flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">{conv.name}</h2>
                  <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-2">
                    {conv.timestamp > 0 ? formatChatTime(conv.timestamp) : ""}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate pr-10">{conv.lastMessage || "No messages yet"}</p>
              </div>

              <div className="ml-4">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {/* FIXED: Added 'M' to the path d attribute */}
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const formatChatTime = (seconds) => {
  const date = new Date(seconds * 1000);
  const now = new Date();
  const diff = now - date;
  if (diff < 86400000 && now.getDate() === date.getDate()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};

export default HirerMessages;