import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
     
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/messages">Messages</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
