import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar avaliações
export async function getAvaliacoes() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/avaliacao`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar avaliação
export async function criarAvaliacao(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/avaliacao`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar avaliação
export async function editarAvaliacao(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/avaliacao/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir avaliação
export async function excluirAvaliacao(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/avaliacao/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
