import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/vendas',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export const listarVendas = () => API.get('/');
export const criarVenda = (data) => API.post('/', data);
export const atualizarVenda = (id, data) => API.put(`/${id}`, data);
export const removerVenda = (id) => API.delete(`/${id}`);
