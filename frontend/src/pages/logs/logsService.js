import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar logs de ação
export async function getLogs() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/logs`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Excluir log (opcional, só para admin)
export async function excluirLog(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/logs/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
