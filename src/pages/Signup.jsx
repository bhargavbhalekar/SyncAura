import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/api';
import './Login.css'; // reuse styles

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSignup = async () => {
    if (!email || !password || !role) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const data = await signup(email, password, role);
      alert('✅ User registered successfully!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-heading">Sign Up</h2>
        <input
          type="email"
          placeholder="✉ Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Member">Member</option>
        </select>
        <button onClick={handleSignup}>Sign Up</button>
      </div>
    </div>
  );
};

export default Signup;
