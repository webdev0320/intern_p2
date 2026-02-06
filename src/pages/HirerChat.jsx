import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHome, FaPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";
// 1. Import Firebase (Ensure you've run: npm install firebase)
import { db } from "../firebaseConfig"; 
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  serverTimestamp, 
  doc, 
  setDoc 
} from "firebase/firestore";

const EmpChat = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const currentUserId = localStorage.getItem("user_id"); // Your ID (Sender)
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Chat States
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState("");

  // Fetch Job & Receiver Details
  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/jobs/detail?offer_id=${offerId}`);
        const result = await response.json();

        if (result.status === "success!" && result.data?.length > 0) {
          const job = result.data[0];
          setJobData(job);

          // 2. Generate Chat ID (Matching Android Logic: smallerID-largerID)
          const receiverId = job.worker_id; // The Employer/Worker ID
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

  // 3. Listen for Messages (Real-time)
  useEffect(() => {
    if (!chatId) return;

    const q = query(
      collection(db, "chats", chatId, "userChats"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgList);
    });

    return () => unsubscribe();
  }, [chatId]);

  // 4. Send Message Logic
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageData = {
      senderId: currentUserId,
      receiverId: jobData.user_id.toString(),
      message: newMessage,
      timestamp: serverTimestamp(),
    };

    try {
      // Add message to sub-collection
      await addDoc(collection(db, "chats", chatId, "userChats"), messageData);

      // Update Conversation document (matches addConversion in Android)
      await setDoc(doc(db, "conversations", chatId), {
        lastMessage: newMessage,
        senderId: currentUserId,
        receiverId: jobData.user_id.toString(),
        timestamp: serverTimestamp(),
        userChatId: chatId,
        // Add other metadata like names/images if available
      }, { merge: true });

      setNewMessage("");
      
      // 5. Trigger Push Notification via your API
      await fetch(`${BASE_URL}/api/send-notification`, {
        method: "POST",
        body: JSON.stringify({
          senderId: currentUserId,
          receiverId: jobData.user_id,
          message: newMessage
        })
      });

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading) return <div className="flex justify-center p-10">Loading Chat...</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="p-4 mt-5 bg-orange-500 text-white flex items-center">
        <h1 className="text-lg font-bold">{jobData?.job_name || "Chat"}</h1>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === currentUserId ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs p-3 rounded-lg ${msg.senderId === currentUserId ? "bg-orange-500 text-white" : "bg-blue-500 text-white"}`}>
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border p-2 rounded-full px-4 outline-none focus:border-orange-500"
        />
        <button type="submit" className="bg-orange-500 text-white p-3 rounded-full">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default EmpChat;