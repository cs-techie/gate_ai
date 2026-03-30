import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Tests
export const testsAPI = {
  getAll: (subject) => api.get('/tests', { params: { subject } }),
  getById: (id) => api.get(`/tests/${id}`),
  create: (data) => api.post('/tests', data),
  delete: (id) => api.delete(`/tests/${id}`),
};

// Questions
export const questionsAPI = {
  getByTest: (testId) => api.get(`/questions/${testId}`),
  create: (data) => api.post('/questions', data),
};

// Results
export const resultsAPI = {
  submit: (data) => api.post('/results', data),
  getMine: () => api.get('/results/me'),
  getAll: () => api.get('/results/all'),
  getByUser: (userId) => api.get(`/results/user/${userId}`),
  getById: (id) => api.get(`/results/${id}`),
};

// Materials
export const materialsAPI = {
  getAll: (subject) => api.get('/materials', { params: { subject } }),
  upload: (formData) => api.post('/materials', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  delete: (id) => api.delete(`/materials/${id}`),
  getFileUrl: (id) => `${API_BASE}/materials/${id}`,
};

// Users (admin)
export const usersAPI = {
  getAll: () => api.get('/auth/users'),
};

// AI Doubt Solver
export const aiAPI = {
  solveDoubt: (message, history = []) =>
    api.post('/ai/doubt', { message, history }),
};

// Study Planner
export const plannerAPI = {
  createPlan: (data) => api.post('/planner/plans', data),
  getPlans: () => api.get('/planner/plans'),
  getPlan: (id) => api.get(`/planner/plans/${id}`),
  updatePlan: (id, data) => api.patch(`/planner/plans/${id}`, data),
  deletePlan: (id) => api.delete(`/planner/plans/${id}`),
  
  // Tasks
  getTasks: (planId, status) => api.get(`/planner/plans/${planId}/tasks`, { params: { status } }),
  getDayPlan: (planId, date) => api.get(`/planner/plans/${planId}/day`, { params: { date_str: date } }),
  updateTask: (taskId, data) => api.patch(`/planner/tasks/${taskId}`, data),
  
  // Analytics
  getAnalytics: (planId) => api.get(`/planner/plans/${planId}/analytics`),
  rescheduleMissed: (planId) => api.post(`/planner/plans/${planId}/reschedule`),
  
  // Subjects
  getSubjects: (planId) => api.get(`/planner/plans/${planId}/subjects`),
};

export default api;
