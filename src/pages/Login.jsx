import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../assets/syncaura-logo.svg';
import { login } from '../api/api'; // 🔄 import login API

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

 const handleLogin = async () => {
  if (!email || !password || !role) {
    alert('Please fill all fields.');
    return;
  }

  try {
    const data = await login(email, password, role);
    console.log("✅ Login successful:", data.user);
    navigate('/dashboard');
  } catch (err) {
    alert(err.response?.data?.error || "Login failed");
  }
};
  return (
    <div className="login-container">
      <div className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="SyncAura Logo" className="navbar-logo" />
          <h1 className="navbar-title">SyncAura</h1>
        </div>
        <div className="navbar-right">
<button className="signup-btn" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </div>

      <div className="login-box">
        <h2 className="login-heading">SyncAura</h2>

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

        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
};

export default Login;
