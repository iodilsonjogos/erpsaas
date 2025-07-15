import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar comissões
export async function getComissoes() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/comissoes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar comissão
export async function criarComissao(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/comissoes`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar comissão
export async function editarComissao(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/comissoes/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir comissão
export async function excluirComissao(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/comissoes/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
