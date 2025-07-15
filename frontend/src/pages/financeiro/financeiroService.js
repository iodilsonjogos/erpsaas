import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar lançamentos financeiros
export async function getLancamentos() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/financeiro`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar lançamento
export async function criarLancamento(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/financeiro`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar lançamento
export async function editarLancamento(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/financeiro/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir lançamento
export async function excluirLancamento(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/financeiro/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
