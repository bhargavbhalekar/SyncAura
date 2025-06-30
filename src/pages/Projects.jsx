import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './Projects.css';
import logo from '../assets/syncaura-logo.svg';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Project A",
      status: "Ongoing",
      startDate: "2025-06-01",
      endDate: "2025-07-15",
      team: "Team Alpha"
    },
    {
      id: 2,
      name: "Project B",
      status: "Completed",
      startDate: "2025-05-01",
      endDate: "2025-06-15",
      team: "Team Beta"
    }
  ]);

  const [newProject, setNewProject] = useState({
    name: "",
    status: "",
    team: "",
    startDate: "",
    endDate: ""
  });

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAddProject = () => {
    if (!newProject.name || !newProject.status) return;

    const projectToAdd = {
      ...newProject,
      id: Date.now()
    };

    setProjects([...projects, projectToAdd]);
    setNewProject({ name: "", status: "", team: "", startDate: "", endDate: "" });
  };

  const handleDelete = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
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
          <h2 className="projects-heading">Projects</h2>

          {/* ➕ Add New Project Form */}
         <div className="add-project-form">
  <input
    type="text"
    placeholder="Project Name"
    value={newProject.name}
    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
  />
  <input
    type="text"
    placeholder="Team Name"
    value={newProject.team}
    onChange={(e) => setNewProject({ ...newProject, team: e.target.value })}
  />

  {/* Label for Start Date */}
  <label className="date-label">Start Date</label>
  <input
    type="date"
    value={newProject.startDate}
    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
  />

  {/* Label for End Date */}
  <label className="date-label">End Date</label>
  <input
    type="date"
    value={newProject.endDate}
    onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
  />

  <button onClick={handleAddProject}>Add Project</button>
</div>


          <div className="projects-list">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <h3>{project.name}</h3>
                <p><strong>Status:</strong> {project.status}</p>
                <p><strong>Team:</strong> {project.team}</p>
                <p><strong>Start:</strong> {project.startDate}</p>
                <p><strong>End:</strong> {project.endDate}</p>
                <button className="delete-btn" onClick={() => handleDelete(project.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
