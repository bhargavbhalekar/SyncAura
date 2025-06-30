import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './Dashboard.css';
import logo from '../assets/syncaura-logo.svg';
import teamCollabIcon from '../assets/icons8-team-collaboration-48.png';
import meetingicon from '../assets/icons8-meeting-room-100.png';
import timelineweek from '../assets/icons8-timeline-week-48.png';


const Dashboard = () => {
  return (
    <div className="dashboard-page">
      {/* Navbar with logo on left and Topbar on right */}
      <div className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="SyncAura Logo" className="navbar-logo" />
          <h1 className="navbar-title">SyncAura</h1>
        </div>

        {/* Topbar is now inside navbar right side */}
        <div className="navbar-right">
          <Topbar />
        </div>
      </div>

      {/* Dashboard layout */}
      <div className="dashboard">
        <Sidebar />
<div className="main-content">
  <h1>Good Morning, Bhargav</h1>

  <div className="stats-row">
    <div className="stat-card"><h3>Projects</h3><span>10</span></div>
    <div className="stat-card"><h3>Teams</h3><span>7</span></div>
    <div className="stat-card"><h3>Tasks</h3><span>120</span></div>
    <div className="stat-card"><h3>Deadlines</h3><span>8</span></div>
    <div className="stat-card"><h3>Today's events</h3><span>2</span></div>
  </div>

  <div className="wide-section">
    <div className="wide-card"><h3>Upcoming events</h3><p>4</p></div>
    <div className="wide-card"><h3>Invite your team</h3></div>
  </div>

  <div className="activity-section">
    <h2>Activity</h2>
    <div className="activity-item">
        <img src={teamCollabIcon} alt="activity" />
      <div className="activity-text">
<h3>Project Kickoff</h3>
<p>July 03, 10:00am</p>
      </div>
    </div>
    <div className="activity-item">
      <img src={meetingicon} alt="activity" />
      <div className="activity-text">
<h3>Team Collaboration Meeting</h3>
        <p>July 04, 10:00am</p>
      </div>
    </div>
    <div className="activity-item">
      <img src={timelineweek} alt="activity" />
      <div className="activity-text">
<h3>Sprint Planning 2023 Q3</h3>
<p>July 05, 11:00am</p>
      </div>
    </div>
  </div>
</div>
 </div>
</div>
  );
};

export default Dashboard;
