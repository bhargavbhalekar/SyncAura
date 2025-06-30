import './Topbar.css';
import profileIcon from '../assets/user-icon.png'; // Replace with your actual image path

const Topbar = () => {
  return (
    <div className="topbar">
      <h1>Welcome, Bhargav 👋</h1>
      <div className="topbar-right">
        <input type="text" placeholder="Search..." />
        <span className="notification">🔔</span>
        <img src={profileIcon} alt="User" className="profile-img" />
      </div>
    </div>
  );
};

export default Topbar;
