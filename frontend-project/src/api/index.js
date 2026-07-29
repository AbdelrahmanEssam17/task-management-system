import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000',
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const verifyEmail = (data) => API.post('/auth/verify-email', data);
export const logoutUser = () => API.post('/auth/logout');

export const getProjects = () => API.get('/projects');
export const getProjectById = (id) => API.get(`/projects/${id}`);
export const createProject = (data) => API.post('/projects', data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

export const getProjectTasks = (projectId, params) =>
  API.get(`/task/projects/${projectId}/tasks`, { params });
export const getTaskById = (id) => API.get(`/task/${id}`);
export const updateTask = (id, data) => API.patch(`/task/${id}`, data);
export const deleteTask = (id) => API.delete(`/task/${id}`);
export const createTask = (projectId, data) =>
  API.post(`/task/projects/${projectId}/tasks`, data);

export default API;
