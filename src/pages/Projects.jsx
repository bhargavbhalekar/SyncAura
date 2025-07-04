import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './Projects.css';
import logo from '../assets/syncaura-logo.svg';
import { createProject, getProjects, deleteProject } from '../api/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [newProject, setNewProject] = useState({
    name: "",
    status: "",
    team: "",
    startDate: "",
    endDate: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error("❌ Failed to fetch projects:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAddProject = async () => {
    if (!newProject.name || !newProject.status) return;

    const projectToAdd = {
      title: newProject.name,
      status: newProject.status,
      startDate: newProject.startDate,
      endDate: newProject.endDate,
      description: `Team: ${newProject.team}`
    };

    try {
      const saved = await createProject(projectToAdd);
      setProjects([...projects, saved]);
      setNewProject({ name: "", status: "", team: "", startDate: "", endDate: "" });
    } catch (error) {
      console.error("❌ Failed to create project:", error);
      alert("Project save failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("Failed to delete project");
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
          <h2 className="projects-heading">Projects</h2>

          {/* ➕ Add New Project Form */}
          <div className="add-project-form">
            <input
              type="text"
              name="name"
              placeholder="Project Name"
              value={newProject.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="team"
              placeholder="Team Name"
              value={newProject.team}
              onChange={handleChange}
            />
            <select
  name="status"
  value={newProject.status}
  onChange={handleChange}
>
  <option value="">Select Status</option>
  <option value="Not Started">Not Started</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>

            <label className="date-label">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={newProject.startDate}
              onChange={handleChange}
            />
            <label className="date-label">End Date</label>
            <input
              type="date"
              name="endDate"
              value={newProject.endDate}
              onChange={handleChange}
            />
            <button onClick={handleAddProject}>Add Project</button>
          </div>

          {/* 📋 Project List */}
          <div className="projects-list">
            {projects.map((project) => (
              <div key={project._id} className="project-card">
                <h3>{project.title}</h3>
                <p><strong>Status:</strong> {project.status}</p>
                <p><strong>Team:</strong> {project.description || 'N/A'}</p>
                <p><strong>Start:</strong> {project.startDate?.slice(0, 10)}</p>
                <p><strong>End:</strong> {project.endDate?.slice(0, 10)}</p>
                <button className="delete-btn" onClick={() => handleDelete(project._id)}>
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
