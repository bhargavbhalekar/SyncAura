import React, { useState, useEffect } from "react";
import { sendMessage, getMessages } from "../services/MessageService";

const ChatBox = ({ senderId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await getMessages(senderId, receiverId);
      setMessages(res);
    };
    fetchMessages();
  }, [senderId, receiverId]);

  const handleSend = async () => {
    const newMsg = await sendMessage({
      sender: senderId,
      receiver: receiverId,
      content,
      chatType: "individual",
    });
    setMessages((prev) => [...prev, newMsg]);
    setContent("");
  };

  return (
    <div>
      <div style={{ border: "1px solid gray", padding: 10, height: 200, overflowY: "scroll" }}>
        {messages.map((msg) => (
          <div key={msg._id}>
            <strong>{msg.sender === senderId ? "You" : "Them"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatBox;
