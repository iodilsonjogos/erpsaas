import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar profissionais
export async function getProfissionais() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/profissionais`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar profissional
export async function criarProfissional(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/profissionais`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar profissional
export async function editarProfissional(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/profissionais/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir profissional
export async function excluirProfissional(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/profissionais/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
