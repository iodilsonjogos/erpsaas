import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api/agenda',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export const listarAgendamentos = () => API.get('/');
export const criarAgendamento = (data) => API.post('/', data);
export const atualizarAgendamento = (id, data) => API.put(`/${id}`, data);
export const removerAgendamento = (id) => API.delete(`/${id}`);
