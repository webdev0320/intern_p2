import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";

const Messages = () => {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("user_id"); // Ensure this is a string
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "conversations"),
      orderBy("timestamp", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(chat =>
          // Use String() to ensure comparison works even if IDs are numbers in DB
          String(chat.senderId) === String(currentUserId) ||
          String(chat.receiverId) === String(currentUserId)
        );
      setChats(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUserId]);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading Messages...</div>;
  }

  return (
    <div className="fixed top-[70px] inset-x-0 bottom-0 bg-gray-50 z-[999]">
      <div className="bg-white border-b p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700">Messages</h2>
      </div>

      <div className="overflow-y-auto h-full pb-24">
        {chats.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No conversations yet</div>
        ) : (
          chats.map(chat => {
            // 💡 LOGIC: If I am the sender, show the receiver's info. 
            // If I am the receiver, show the sender's info.
            const isMeSender = String(chat.senderId) === String(currentUserId);
            
            const otherUserName = isMeSender ? chat.receiverName : chat.senderName;
            const otherUserImage = isMeSender ? chat.receiverImage : chat.senderImage;

            return (
              <div
                key={chat.id}
                onClick={() => navigate(`/emp-chat/${chat.userChatId}`)}
                className="flex items-center gap-4 p-4 border-b bg-white hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold overflow-hidden flex-shrink-0">
                  {otherUserImage ? (
                    <img src={otherUserImage} alt="profile" className="w-full h-full object-cover" />
                  ) : (
                    <span>{otherUserName?.charAt(0).toUpperCase() || "?"}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 truncate">
                    {otherUserName || "Unknown User"}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {chat.lastMessage}
                  </div>
                </div>

                {/* Timestamp */}
                {chat.timestamp?.seconds && (
                  <div className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(chat.timestamp.seconds * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Messages;