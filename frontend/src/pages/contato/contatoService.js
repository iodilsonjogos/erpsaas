import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar mensagens de contato
export async function getContatos() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/contato`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar contato/mensagem
export async function criarContato(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/contato`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar/responder contato
export async function editarContato(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/contato/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir contato
export async function excluirContato(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/contato/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
