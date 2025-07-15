import axios from 'axios';

const API_BASE_URL = 'https://mongodb-production-edf0.up.railway.app/api';

// 🟢 Teams
export const createTeam = async (teamData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/teams`, teamData);
    return res.data;
  } catch (err) {
    console.error('Error creating team:', err.response?.data || err.message);
    throw err;
  }
};

export const updateTeam = async (id, teamData) => {
  const res = await axios.put(`${API_BASE_URL}/teams/${id}`, teamData);
  return res.data;
};

export const deleteTeam = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/teams/${id}`);
  return res.data;
};

export const getTeams = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/teams`);
    return res.data;
  } catch (err) {
    console.error('Error fetching teams:', err);
    return [];
  }
};

// 🟢 Users
export const getUsers = async () => {
  const res = await axios.get(`${API_BASE_URL}/users`);
  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await axios.put(`${API_BASE_URL}/users/${id}`, data);
  return res.data;
};

// 🟢 Messages
export const getMessages = async (senderId, receiverId) => {
  const res = await axios.get(`${API_BASE_URL}/messages/${senderId}/${receiverId}`);
  return res.data;
};

export const sendMessage = async (senderId, receiverId, message) => {
  const res = await axios.post(`${API_BASE_URL}/messages/${senderId}/${receiverId}`, message);
  return res.data;
};

// 🟢 Projects
export const createProject = async (projectData) => {
  const res = await axios.post(`${API_BASE_URL}/projects`, projectData);
  return res.data;
};

export const getProjects = async () => {
  const res = await axios.get(`${API_BASE_URL}/projects`);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/projects/${id}`);
  return res.data;
};

// 🟢 Tasks
export const getTasks = async () => {
  const res = await axios.get(`${API_BASE_URL}/tasks`);
  return res.data;
};

export const createTask = async (taskData) => {
  const res = await axios.post(`${API_BASE_URL}/tasks`, taskData);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  return res.data;
};

// 🟢 Dashboard Stats
export const getDashboardStats = async () => {
  const [projects, teams, tasks] = await Promise.all([
    getProjects(),
    getTeams(),
    getTasks(),
  ]);
  return {
    projectsCount: projects.length,
    teamsCount: teams.length,
    tasksCount: tasks.length,
  };
};

// 🟢 Auth
export const login = async (email, password, role) => {
  const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password, role });
  return res.data;
};

export const signup = async (email, password, role) => {
  const res = await axios.post(`${API_BASE_URL}/auth/signup`, { email, password, role });
  return res.data;
};
