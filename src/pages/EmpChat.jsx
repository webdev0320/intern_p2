import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
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
  where,
} from "firebase/firestore";

const EmpChat = () => {
  const { offerId } = useParams();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // 🔑 FIREBASE CHAT IDS (IMPORTANT)
  const senderFirebaseChatId = localStorage.getItem("user_id");
  const senderName = localStorage.getItem("name");
  const senderImage = localStorage.getItem("image");

  const [jobData, setJobData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });

  useEffect(scrollToBottom, [messages]);

  // 🔹 Load job + generate chatId EXACTLY like Android
  useEffect(() => {
    const fetchJobDetail = async () => {
      const res = await fetch(`${BASE_URL}/api/jobs/detail?offer_id=${offerId}`);
      const result = await res.json();

      if (result.status === "success!" && result.data?.length > 0) {
        const job = result.data[0];
        setJobData(job);

        const receiverFirebaseChatId = 45;//job.user_id;

        const generatedChatId =
          senderFirebaseChatId > receiverFirebaseChatId
            ? `${receiverFirebaseChatId}-${senderFirebaseChatId}`
            : `${senderFirebaseChatId}-${receiverFirebaseChatId}`;

        setChatId(generatedChatId);
      }
    };

    fetchJobDetail();
  }, [offerId]);

  // 🔹 LISTEN MESSAGES (same as Android: two queries)
  useEffect(() => {
    if (!chatId || !jobData) return;

    const receiverFirebaseChatId = jobData.user_id;

    const q1 = query(
      collection(db, "chats", chatId, "userChats"),
      where("senderId", "==", senderFirebaseChatId),
      where("receiverId", "==", receiverFirebaseChatId)
    );

    const q2 = query(
      collection(db, "chats", chatId, "userChats"),
      where("senderId", "==", receiverFirebaseChatId),
      where("receiverId", "==", senderFirebaseChatId)
    );

    const allMessages = [];

    const unsub1 = onSnapshot(q1, (snap) => {
      snap.docChanges().forEach((c) => {
        if (c.type === "added") allMessages.push({ id: c.doc.id, ...c.doc.data() });
      });
      setMessages([...allMessages].sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds));
    });

    const unsub2 = onSnapshot(q2, (snap) => {
      snap.docChanges().forEach((c) => {
        if (c.type === "added") allMessages.push({ id: c.doc.id, ...c.doc.data() });
      });
      setMessages([...allMessages].sort((a, b) => a.timestamp?.seconds - b.timestamp?.seconds));
    });

    return () => {
      unsub1();
      unsub2();
    };
  }, [chatId, jobData]);

  // 🔹 SEND MESSAGE (ANDROID MATCH)
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const receiverFirebaseChatId = jobData.user_id;
    const messageText = newMessage;
    setNewMessage("");

    // 1️⃣ Add chat message
    await addDoc(collection(db, "chats", chatId, "userChats"), {
      senderId: senderFirebaseChatId,
      receiverId: receiverFirebaseChatId,
      message: messageText,
      timestamp: serverTimestamp(),
    });

    // 2️⃣ Update conversation (FULL ANDROID SCHEMA)
    await setDoc(
      doc(db, "conversations", chatId),
      {
        senderId: senderFirebaseChatId,
        senderName,
        senderImage,
        receiverId: receiverFirebaseChatId,
        receiverName: jobData.name,
        receiverImage: jobData.image,
        lastMessage: messageText,
        timestamp: serverTimestamp(),
        userChatId: chatId,
        [senderFirebaseChatId]: 0,
        [receiverFirebaseChatId]: 1, // increment logic can be added later
      },
      { merge: true }
    );
  };

  if (!jobData) return <div className="p-10">Loading Chat…</div>;

  return (
    <div className="fixed top-[70px] inset-x-0 bottom-[64px] flex flex-col bg-gray-100 z-[999]">
      <div className="bg-white border-b p-3 font-semibold">
        {jobData.name}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === senderFirebaseChatId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                msg.senderId === senderFirebaseChatId
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-gray-100 p-3 rounded-full outline-none"
          placeholder="Write a message..."
        />
        <button className="bg-blue-600 text-white p-3 rounded-full">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default EmpChat;
