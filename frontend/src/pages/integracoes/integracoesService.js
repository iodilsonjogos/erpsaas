import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar integrações
export async function getIntegracoes() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/integracoes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar integração
export async function criarIntegracao(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/integracoes`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar integração
export async function editarIntegracao(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/integracoes/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir integração
export async function excluirIntegracao(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/integracoes/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
