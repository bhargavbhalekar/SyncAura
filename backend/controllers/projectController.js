import Project from '../models/Project.js';

export const getAllProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

export const createProject = async (req, res) => {
  const newProject = new Project(req.body);
  const savedProject = await newProject.save();
  res.status(201).json(savedProject);
};

export const updateProject = async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
};
