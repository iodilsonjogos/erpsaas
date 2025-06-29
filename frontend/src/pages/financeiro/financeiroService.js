import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/financeiro',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export const listarLancamentos = () => API.get('/');
export const criarLancamento = (data) => API.post('/', data);
export const atualizarLancamento = (id, data) => API.put(`/${id}`, data);
export const removerLancamento = (id) => API.delete(`/${id}`);
