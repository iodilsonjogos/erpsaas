import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar registros de fidelidade
export async function getFidelidades() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/fidelidade`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar registro
export async function criarFidelidade(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/fidelidade`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar registro
export async function editarFidelidade(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/fidelidade/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir registro
export async function excluirFidelidade(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/fidelidade/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
