import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar itens do checklist
export async function getChecklist() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/checklist`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar item
export async function criarChecklist(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/checklist`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar item
export async function editarChecklist(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/checklist/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir item
export async function excluirChecklist(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/checklist/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
