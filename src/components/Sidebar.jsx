import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Optional: clear localStorage or tokens here
      navigate('/'); // Redirect to login
    }
  };

  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/messages">Messages</Link></li>
        <li><a href="/" onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
