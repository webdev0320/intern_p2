import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { db } from "../firebaseConfig"; 
import { 
  collection, 
  addDoc, 
  query, 
  onSnapshot, 
  orderBy, 
  serverTimestamp, 
  doc, 
  setDoc 
} from "firebase/firestore";

const EmpChat = () => {
  const { offerId } = useParams();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const currentUserId = localStorage.getItem("user_id");

  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState("");

  const messagesEndRef = useRef(null);

  // 1. Kill the body scroll entirely while on this page
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/jobs/detail?offer_id=${offerId}`);
        const result = await response.json();
        if (result.status === "success!" && result.data?.length > 0) {
          const job = result.data[0];
          setJobData(job);
          const receiverId = job.user_id;
          const generatedId = parseInt(currentUserId) < parseInt(receiverId) 
            ? `${currentUserId}-${receiverId}` 
            : `${receiverId}-${currentUserId}`;
          setChatId(generatedId);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetail();
  }, [offerId, currentUserId]);

  useEffect(() => {
    if (!chatId) return;
    const q = query(collection(db, "chats", chatId, "userChats"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgList);
    });
    return () => unsubscribe();
  }, [chatId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const tempMsg = newMessage;
    setNewMessage("");

    try {
      await addDoc(collection(db, "chats", chatId, "userChats"), {
        senderId: currentUserId,
        receiverId: jobData.user_id.toString(),
        message: tempMsg,
        timestamp: serverTimestamp(),
        timestamp: serverTimestamp(),
      });
      await setDoc(doc(db, "conversations", chatId), {
        lastMessage: tempMsg,
        senderId: currentUserId,
        receiverId: jobData.user_id.toString(),
        timestamp: serverTimestamp(),
        userChatId: chatId,
      }, { merge: true });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) return <div className="flex justify-center p-10">Loading Chat...</div>;

  return (
    /* THE SOLUTION:
       - top-[80px]: This should match the height of your website's main navbar.
       - fixed inset-x-0 bottom-0: Pins it to the sides and the very bottom of the screen.
    */
    <div className="fixed top-[70px] inset-x-0 bottom-0 flex flex-col bg-gray-50 z-[999]">
      
      {/* Header (Optional inside the chat box) */}
      <div className="flex-none bg-white border-b p-3 flex items-center justify-between shadow-sm">
        <h2 className="font-semibold text-gray-700">{jobData?.job_name || "Chat"}</h2>
      </div>

      {/* Messages: flex-1 makes this the ONLY scrolling part */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === currentUserId ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-2xl max-w-[85%] shadow-sm ${
              msg.senderId === currentUserId 
              ? "bg-blue-600 text-white rounded-br-none" 
              : "bg-white text-gray-800 border rounded-bl-none"
            }`}>
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input: Stays pinned at the bottom because the parent is fixed bottom-0 */}
      <div className="flex-none p-4 bg-white border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 max-w-5xl mx-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 bg-gray-100 border-none p-3 rounded-full px-5 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white p-3.5 rounded-full hover:bg-blue-700 shadow-md"
          >
            <FaPaperPlane size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmpChat;