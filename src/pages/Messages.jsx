import React, { useState, useEffect } from "react";
import { sendMessage, getMessages } from "../api/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import logo from "../assets/syncaura-logo.svg";
import "./Messages.css";

const Messages = () => {
  const senderId = "685d175d44af0c1684e19866";
  const receiverId = "685d178c44af0c1684e19868";

  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const msgs = await getMessages(senderId, receiverId);
      setMessages(msgs);
    };
    fetchMessages();
  }, []);

  const handleSend = async () => {
    if (newMsg.trim() === "") return;

    const sent = await sendMessage(senderId, receiverId, newMsg);
    if (sent) {
      setMessages((prev) => [...prev, sent]);
      setNewMsg("");
    } else {
      alert("Message send failed");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="SyncAura Logo" className="navbar-logo" />
          <h1 className="navbar-title">SyncAura</h1>
        </div>
        <div className="navbar-right">
          <Topbar />
        </div>
      </div>

      <div className="dashboard">
        <Sidebar />
        <div className="main-content">
          <div className="messages-container">
            <h2>Messages</h2>
            <div className="chat-box">
              {messages.length === 0 ? (
                <p className="no-messages">No messages yet.</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`message-bubble ${
                      msg.sender === senderId ? "sent" : "received"
                    }`}
                  >
                    <span className="message-sender">
                      {msg.sender === senderId ? "You" : "Them"}:
                    </span>
                    <span className="message-content">{msg.content}</span>
                  </div>
                ))
              )}
            </div>
            <div className="message-input">
              <input
                type="text"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
