/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Frontend API client for VirtuLearn (axios, named exports)
 * BACKEND CONTRACT: Calls Express backend endpoints under /api/*
 * TODO: Replace mock with real axios base URL via VITE_BACKEND_URL and connect auth
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const api = axios.create({ baseURL: API_BASE_URL, withCredentials: false, timeout: 20000 });

api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('virtulearn_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (_) {}
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    // Simple normalization
    const message = error?.response?.data?.message || error.message || 'Request failed';
    return Promise.reject(new Error(message));
  }
);

// Quizzes
export const getQuizzes = async (params = {}) => {
  const res = await api.get('/api/quizzes', { params });
  return res.data;
};

export const getQuizById = async (id) => {
  const res = await api.get(`/api/quizzes/${id}`);
  return res.data;
};

export const createQuiz = async (payload) => {
  // TODO: API -> /api/quizzes (POST)
  const res = await api.post('/api/quizzes', payload);
  return res.data;
};

export const submitQuiz = async (id, answers) => {
  // supports alias /attempt and /submit
  const res = await api.post(`/api/quizzes/${id}/submit`, { answers });
  return res.data;
};

export const getQuizAnalysis = async (id) => {
  const res = await api.get(`/api/quizzes/${id}/analysis`);
  return res.data;
};

// Experiments
export const getExperiments = async (params = {}) => {
  const res = await api.get('/api/experiments', { params });
  return res.data;
};

export const assignExperiment = async (payload) => {
  const res = await api.post('/api/experiments/assign', payload);
  return res.data;
};

export const getExperimentLogs = async (params = {}) => {
  const res = await api.get('/api/experiments/logs', { params });
  return res.data;
};

// Community
export const getCommunityPosts = async (params = {}) => {
  // supports /api/community and /api/community/posts
  const res = await api.get('/api/community/posts', { params });
  return res.data;
};

export const createCommunityPost = async (payload) => {
  const res = await api.post('/api/community/posts', payload);
  return res.data;
};

export const addComment = async (postId, text) => {
  const res = await api.post(`/api/community/comment/${postId}`, { text });
  return res.data;
};

// S3 uploads (presign then PUT)
export const getPresignedUpload = async ({ key, contentType }) => {
  const res = await api.get('/api/s3/presign-upload', { params: { key, contentType } });
  return res.data; // { url }
};

export const uploadWithPresignedUrl = async (url, file, contentType) => {
  await axios.put(url, file, { headers: { 'Content-Type': contentType } });
};

export const saveS3Metadata = async (metadata) => {
  const res = await api.post('/api/s3/metadata', metadata);
  return res.data;
};

export const uploadMedia = async (file, { keyPrefix = 'virtulearn/uploads' } = {}) => {
  const ext = file.name?.split('.').pop() || 'bin';
  const key = `${keyPrefix}/${Date.now()}-${Math.random().toString(16).slice(2)}.${ext}`;
  const contentType = file.type || 'application/octet-stream';
  const { url } = await getPresignedUpload({ key, contentType });
  await uploadWithPresignedUrl(url, file, contentType);
  const meta = await saveS3Metadata({ key, url: url.split('?')[0], contentType });
  return meta.s3Metadata;
};

// AI Chat
export const sendChatbotPrompt = async (message, context = {}) => {
  const res = await api.post('/api/ai/chat', { message, context });
  return res.data; // { messages, suggestion }
};

// Auth helpers used by Login page
export const login = async (email, password) => {
  const res = await api.post('/api/auth/login', { email, password });
  const token = res.data?.token;
  if (token) localStorage.setItem('virtulearn_token', token);
  return res.data;
};

export const register = async (payload) => {
  const res = await api.post('/api/auth/register', payload);
  const token = res.data?.token;
  if (token) localStorage.setItem('virtulearn_token', token);
  return res.data;
};

export const me = async () => {
  const res = await api.get('/api/auth/me');
  return res.data;
};

// ----- Aliases for backward compatibility with existing pages -----

export const postQuizAttempt = async (quizId, payload) => {
  // payload may be { answers: [...] } or direct array
  const answers = Array.isArray(payload) ? payload : payload?.answers || [];
  return submitQuiz(quizId, answers);
};

export const getClasses = async () => {
  // Derive classes from users with role=student (backend does not expose /api/classes)
  const res = await api.get('/api/users', { params: { role: 'student', limit: 1000 } });
  const users = res.data || [];
  const set = new Set(users.map((u) => u.classId).filter(Boolean));
  const classes = Array.from(set).map((id) => ({ id, name: id }));
  return classes;
};

export const postAssignExperiment = async (payload) => assignExperiment(payload);

export const postCommunityPost = async (payload) => createCommunityPost(payload);

export const postCreateQuiz = async (payload) => createQuiz(payload);

export const getQuizAttempts = async (quizId) => {
  const res = await api.get(`/api/quizzes/${quizId}/attempts`);
  return res.data;
};


