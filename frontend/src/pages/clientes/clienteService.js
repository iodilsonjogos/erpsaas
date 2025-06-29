import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/clientes',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export const listarClientes = () => API.get('/');
export const criarCliente = (data) => API.post('/', data);
export const atualizarCliente = (id, data) => API.put(`/${id}`, data);
export const removerCliente = (id) => API.delete(`/${id}`);
