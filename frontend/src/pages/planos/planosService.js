import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar planos
export async function getPlanos() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/planos`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar plano
export async function criarPlano(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/planos`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar plano
export async function editarPlano(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/planos/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir plano
export async function excluirPlano(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/planos/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
