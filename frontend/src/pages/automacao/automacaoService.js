import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar automações
export async function getAutomacoes() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/automacao`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar automação
export async function criarAutomacao(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/automacao`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar automação
export async function editarAutomacao(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/automacao/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir automação
export async function excluirAutomacao(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/automacao/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
