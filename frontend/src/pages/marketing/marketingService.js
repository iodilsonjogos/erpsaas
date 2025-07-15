import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar campanhas
export async function getCampanhas() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/marketing`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar campanha
export async function criarCampanha(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/marketing`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar campanha
export async function editarCampanha(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/marketing/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir campanha
export async function excluirCampanha(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/marketing/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
