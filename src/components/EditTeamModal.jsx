import React, { useState, useEffect } from 'react';
import './EditTeamModal.css';

const EditTeamModal = ({ team, onClose, onSave }) => {
  const [editedTeam, setEditedTeam] = useState({
    name: '',
    members: '',
    roles: '',
    assignedProjects: ''
  });

  // Populate form with existing data
  useEffect(() => {
    setEditedTeam({
      name: team.name || '',
      members: team.members?.map(m => m.name).join(', ') || '',
      roles: team.roles?.join(', ') || '',
      assignedProjects: team.projects?.join(', ') || ''
    });
  }, [team]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTeam(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const memberNames = editedTeam.members.split(',').map(m => m.trim());
    const roleNames = editedTeam.roles.split(',').map(r => r.trim());

    const updatedTeam = {
      _id: team._id,
      name: editedTeam.name,
      members: memberNames.map((name, i) => ({
        name,
        role: roleNames[i] || ''
      })),
      roles: roleNames,
      projects: editedTeam.assignedProjects.split(',').map(p => p.trim())
    };

    onSave(updatedTeam);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Team</h2>

        <input
          type="text"
          name="name"
          value={editedTeam.name}
          onChange={handleChange}
          placeholder="Team Name"
        />

        <input
          type="text"
          name="members"
          value={editedTeam.members}
          onChange={handleChange}
          placeholder="Members (comma separated)"
        />

        <input
          type="text"
          name="roles"
          value={editedTeam.roles}
          onChange={handleChange}
          placeholder="Roles (comma separated)"
        />

        <input
          type="text"
          name="assignedProjects"
          value={editedTeam.assignedProjects}
          onChange={handleChange}
          placeholder="Projects (comma separated)"
        />

        <div className="modal-actions">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditTeamModal;
