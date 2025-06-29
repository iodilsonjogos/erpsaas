import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/servicos',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export const listarServicos = () => API.get('/');
export const criarServico = (data) => API.post('/', data);
export const atualizarServico = (id, data) => API.put(`/${id}`, data);
export const removerServico = (id) => API.delete(`/${id}`);
