import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar notificações
export async function getNotificacoes() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/notificacoes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar notificação
export async function criarNotificacao(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/notificacoes`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar notificação
export async function editarNotificacao(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/notificacoes/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir notificação
export async function excluirNotificacao(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/notificacoes/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
