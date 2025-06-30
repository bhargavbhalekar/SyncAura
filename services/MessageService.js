const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const sendMessage = async (data) => {
  const res = await fetch(`${API}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const getMessages = async (senderId, receiverId) => {
  const res = await fetch(`${API}/messages/${senderId}/${receiverId}`);
  return await res.json();
};
