const isLive = false;

export const COLLECTIONS = {
  USERS: isLive ? "users" : "usersStaging",
  CHAT: isLive ? "chat" : "chatStaging",
  CONVERSATIONS: isLive
    ? "conversations"
    : "conversationsStaging",
};
export const FIELDS = {
  SENDER_ID: "senderId",
  RECEIVER_ID: "receiverId",
  MESSAGE: "message",
  TIMESTAMP: "timestamp",
  CHAT_ID: "chatId",
  LAST_MESSAGE: "lastMessage",
  SENDER_NAME: "senderName",
  RECEIVER_NAME: "receiverName",
  SENDER_IMAGE: "senderImage",
  RECEIVER_IMAGE: "receiverImage",
};
