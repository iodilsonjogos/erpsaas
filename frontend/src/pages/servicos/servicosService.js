import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar serviços
export async function getServicos() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/servicos`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar serviço
export async function criarServico(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/servicos`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar serviço
export async function editarServico(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/servicos/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir serviço
export async function excluirServico(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/servicos/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
