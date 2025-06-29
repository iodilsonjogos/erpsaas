import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL + '/produtos',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export const listarProdutos = () => API.get('/');
export const criarProduto = (data) => API.post('/', data);
export const atualizarProduto = (id, data) => API.put(`/${id}`, data);
export const removerProduto = (id) => API.delete(`/${id}`);
