import React, { useState, useEffect } from "react";
import {
  getUsers,
  getTeams,
  getMessages,
  sendMessage,
} from "../api/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import logo from "../assets/syncaura-logo.svg";
import "./Messages.css";

const currentUserId = "685d175d44af0c1684e19866"; // 🔁 Replace with real logged-in user ID

const Messages = () => {
  const [chatType, setChatType] = useState("user"); // 'user' or 'team'
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    const fetchLists = async () => {
      const usersData = await getUsers();
      const teamsData = await getTeams();
      setUsers(usersData);
      setTeams(teamsData);
    };
    fetchLists();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedId) return;

      try {
        let msgs;
        if (chatType === "user") {
          msgs = await getMessages(currentUserId, selectedId);
        } else {
          const res = await fetch(
            `http://localhost:5002/api/messages/group/${selectedId}`
          );
          msgs = await res.json();
        }
        setMessages(msgs);
      } catch (err) {
        console.error("Fetch messages failed:", err);
        setMessages([]);
      }
    };
    fetchMessages();
  }, [chatType, selectedId]);

  const handleSend = async () => {
    if (!newMsg.trim() || !selectedId) return;

    try {
      const payload = {
        sender: currentUserId,
        receiver: selectedId,
        content: newMsg,
      };

      let sent;
      if (chatType === "user") {
        sent = await sendMessage(currentUserId, selectedId, payload);
      } else {
        const res = await fetch(
          `http://localhost:5002/api/messages/group/${selectedId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        sent = await res.json();
      }

      setMessages((prev) => [...prev, sent]);
      setNewMsg("");
    } catch (err) {
      alert("Failed to send message");
      console.error(err);
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

            {/* Toggle between user/team chat */}
            <div className="chat-toggle">
              <button
                className={chatType === "user" ? "active" : ""}
                onClick={() => {
                  setChatType("user");
                  setSelectedId("");
                  setMessages([]);
                }}
              >
                Chat with User
              </button>
              <button
                className={chatType === "team" ? "active" : ""}
                onClick={() => {
                  setChatType("team");
                  setSelectedId("");
                  setMessages([]);
                }}
              >
                Group Chat
              </button>
            </div>

            {/* Select user or team */}
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">Select {chatType === "user" ? "User" : "Team"}</option>
              {(chatType === "user" ? users : teams).map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name || item.username || "Unnamed"}
                </option>
              ))}
            </select>

            {/* Chat Box */}
            <div className="chat-box">
              {messages.length === 0 ? (
                <p className="no-messages">No messages yet.</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`message-bubble ${
                      msg.sender === currentUserId ? "sent" : "received"
                    }`}
                  >
                    <span className="message-sender">
                      {msg.sender === currentUserId ? "You" : "Them"}:
                    </span>
                    <span className="message-content">{msg.content}</span>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            {selectedId && (
              <div className="message-input">
                <input
                  type="text"
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  placeholder="Type a message..."
                />
                <button onClick={handleSend}>Send</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
