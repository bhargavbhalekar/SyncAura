import axios from 'axios';

const API = 'http://localhost:5000/api/messages';

export const sendMessage = async (senderId, receiverId, content) => {
  try {
    const res = await axios.post(`${API}/${senderId}/${receiverId}`, {
      chatType: "individual",
      sender: senderId,
      receiver: receiverId,
      content: content
    });
    return res.data;
  } catch (err) {
    console.error('sendMessage error:', err.response?.data || err.message);
    return null;
  }
};

export const getMessages = async (senderId, receiverId) => {
  try {
    const res = await axios.get(`${API}/${senderId}/${receiverId}`);
    return res.data;
  } catch (err) {
    console.error('getMessages error:', err.response?.data || err.message);
    return [];
  }
};
