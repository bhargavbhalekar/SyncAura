import React, { useState } from 'react';
import './EditTeamModal.css';

const EditTeamModal = ({ team, onClose, onSave }) => {
  const [editedTeam, setEditedTeam] = useState({ ...team });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTeam({ ...editedTeam, [name]: value });
  };

const handleSave = () => {
  const formatToArray = (value) => {
    return Array.isArray(value) ? value : value.split(',').map(item => item.trim());
  };

  const updatedTeam = {
    ...editedTeam,
    members: formatToArray(editedTeam.members),
    roles: formatToArray(editedTeam.roles),
    assignedProjects: formatToArray(editedTeam.assignedProjects),
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
          value={editedTeam.members.join(', ')} // ← BAD: `.join()` inside JSX
          onChange={handleChange}
        />

        <input
          type="text"
          name="roles"
          value={editedTeam.roles.join(', ')}
          onChange={handleChange}
          placeholder="Roles (comma separated)"
        />
        <input
          type="text"
          name="assignedProjects"
          value={editedTeam.assignedProjects.join(', ')}
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
