import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './Teams.css';
import logo from '../assets/syncaura-logo.svg';
import EditTeamModal from '../components/EditTeamModal';
import { getTeams, createTeam } from '../api/api';
import { updateTeam } from '../api/api'; 
import { deleteTeam } from '../api/api';



const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({
    name: '',
    members: '',
    roles: '',
    assignedProjects: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Load teams from backend
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        setTeams(data);
      } catch (err) {
        console.error('Error fetching teams:', err);
      }
    };

    fetchTeams();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  const handleAddTeam = async () => {
    const { name, members, roles, assignedProjects } = newTeam;
    if (!name || !members || !roles || !assignedProjects) return;

    const newTeamData = {
      name,
      members: members.split(',').map((m, i) => ({
        name: m.trim(),
        role: roles.split(',')[i]?.trim() || ''
      })),
      roles: roles.split(',').map(r => r.trim()),
      projects: assignedProjects.split(',').map(p => p.trim())
    };

    try {
      const savedTeam = await createTeam(newTeamData);
      setTeams([...teams, savedTeam]);
      setNewTeam({ name: '', members: '', roles: '', assignedProjects: '' });
    } catch (error) {
      alert("Failed to save team to backend");
      console.error("Team saving failed:", error);
    }
  };

const handleDeleteTeam = async (id) => {
  try {
    await deleteTeam(id);
    setTeams(teams.filter(team => team._id !== id)); 
  } catch (err) {
    console.error('Delete failed:', err.response?.data || err.message);
    alert('Failed to delete team');
  }
};

  const handleEditClick = (team) => {
    setSelectedTeam(team);
    setIsEditing(true);
  };

const handleSaveEdit = async (updatedTeam) => {
  try {
    const saved = await updateTeam(updatedTeam._id, updatedTeam);
    const updatedTeams = teams.map(team =>
      team._id === saved._id ? saved : team
    );
    setTeams(updatedTeams);
    setIsEditing(false);
    setSelectedTeam(null);
  } catch (err) {
    console.error('Update failed:', err);
    alert('Failed to update team');
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
          <h2 className="teams-heading">Teams</h2>

          {/* Add Team Form */}
          <div className="add-team-form">
            <input
              type="text"
              name="name"
              placeholder="Team Name"
              value={newTeam.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="members"
              placeholder="Members (comma separated)"
              value={newTeam.members}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="roles"
              placeholder="Roles (comma separated)"
              value={newTeam.roles}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="assignedProjects"
              placeholder="Assigned Projects (comma separated)"
              value={newTeam.assignedProjects}
              onChange={handleInputChange}
            />
            <button onClick={handleAddTeam}>Add Team</button>
          </div>

          {/* Teams List */}
          <div className="teams-list">
            {teams.map((team) => (
              <div key={team._id} className="team-card">
                <h3>{team.name}</h3>
                <p>
                  <strong>Members:</strong>{' '}
                  {team.members?.map((m, i) =>
                    typeof m === 'object'
                      ? `${m.name || 'N/A'} (${m.role || 'N/A'})`
                      : m
                  ).join(', ')}
                </p>
                <p><strong>Roles:</strong> {team.roles?.join(', ')}</p>
                <p><strong>Projects:</strong> {team.projects?.join(', ')}</p>
                <div className="team-actions">
                  <button onClick={() => handleEditClick(team)}>Edit</button>
                  <button className="delete" onClick={() => handleDeleteTeam(team._id)}>Delete</button>
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
