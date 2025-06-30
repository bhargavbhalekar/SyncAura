import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './Teams.css';
import logo from '../assets/syncaura-logo.svg';
import EditTeamModal from '../components/EditTeamModal';

const Teams = () => {
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Team Alpha",
      members: ["Alice", "Bob", "Charlie"],
      roles: ["Frontend", "Backend", "UI/UX"],
      assignedProjects: ["Project A"]
    },
    {
      id: 2,
      name: "Team Beta",
      members: ["David", "Eva"],
      roles: ["QA", "DevOps"],
      assignedProjects: ["Project B"]
    }
  ]);

  const [newTeam, setNewTeam] = useState({
    name: '',
    members: '',
    roles: '',
    assignedProjects: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  const handleAddTeam = () => {
    const { name, members, roles, assignedProjects } = newTeam;
    if (!name || !members || !roles || !assignedProjects) return;

    const newTeamData = {
      id: Date.now(),
      name,
      members: members.split(',').map(m => m.trim()),
      roles: roles.split(',').map(r => r.trim()),
      assignedProjects: assignedProjects.split(',').map(p => p.trim())
    };

    setTeams([...teams, newTeamData]);
    setNewTeam({ name: '', members: '', roles: '', assignedProjects: '' });
  };

  const handleDeleteTeam = (id) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  const handleEditClick = (team) => {
    setSelectedTeam(team);
    setIsEditing(true);
  };

  const handleSaveEdit = (updatedTeam) => {
    const updatedTeams = teams.map(team => team.id === updatedTeam.id ? updatedTeam : team);
    setTeams(updatedTeams);
    setIsEditing(false);
    setSelectedTeam(null);
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
          <h2 className="teams-heading">Teams</h2>

          {/* Add Team Form */}
          <div className="add-team-form">
            <input type="text" name="name" placeholder="Team Name" value={newTeam.name} onChange={handleInputChange} />
            <input type="text" name="members" placeholder="Members (comma separated)" value={newTeam.members} onChange={handleInputChange} />
            <input type="text" name="roles" placeholder="Roles (comma separated)" value={newTeam.roles} onChange={handleInputChange} />
            <input type="text" name="assignedProjects" placeholder="Assigned Projects" value={newTeam.assignedProjects} onChange={handleInputChange} />
            <button onClick={handleAddTeam}>Add Team</button>
          </div>

          {/* Teams List */}
          <div className="teams-list">
            {teams.map((team) => (
              <div key={team.id} className="team-card">
                <h3>{team.name}</h3>
                <p><strong>Members:</strong> {team.members.join(', ')}</p>
                <p><strong>Roles:</strong> {team.roles.join(', ')}</p>
                <p><strong>Projects:</strong> {team.assignedProjects.join(', ')}</p>
                <div className="team-actions">
                  <button onClick={() => handleEditClick(team)}>Edit</button>
                  <button className="delete" onClick={() => handleDeleteTeam(team.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <EditTeamModal
          team={selectedTeam}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Teams;
