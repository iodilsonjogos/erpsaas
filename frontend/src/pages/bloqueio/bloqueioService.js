import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar bloqueios
export async function getBloqueios() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/bloqueio`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar bloqueio
export async function criarBloqueio(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/bloqueio`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar bloqueio
export async function editarBloqueio(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/bloqueio/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir bloqueio
export async function excluirBloqueio(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/bloqueio/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
