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
  const currentUserId = localStorage.getItem("user_id");
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
          chat.senderId === currentUserId ||
          chat.receiverId === currentUserId
        );

      setChats(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUserId]);

  if (loading) {
    return <div className="p-10 text-center">Loading Messages...</div>;
  }

  return (
    <div className="fixed top-[70px] inset-x-0 bottom-0 bg-gray-50 z-[999]">
      
      {/* Header */}
      <div className="bg-white border-b p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700">Messages</h2>
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto h-full">
        {chats.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No conversations yet
          </div>
        )}

        {chats.map(chat => {
          const otherUserId =
            chat.senderId === currentUserId
              ? chat.receiverId
              : chat.senderId;

          return (
            <div
              key={chat.id}
              onClick={() => navigate(`/emp-chat/${chat.userChatId}`)}
              className="flex items-center gap-4 p-4 border-b bg-white hover:bg-gray-100 cursor-pointer"
            >
              {/* Avatar Placeholder */}
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {otherUserId?.charAt(0)}
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="font-medium text-gray-800">
                  User #{otherUserId}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {chat.lastMessage}
                </div>
              </div>

              {/* Time */}
              {chat.timestamp?.seconds && (
                <div className="text-xs text-gray-400">
                  {new Date(chat.timestamp.seconds * 1000).toLocaleTimeString()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
