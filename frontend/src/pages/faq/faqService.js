import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar perguntas frequentes
export async function getFaqs() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/faq`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar FAQ
export async function criarFaq(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/faq`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar FAQ
export async function editarFaq(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/faq/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir FAQ
export async function excluirFaq(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/faq/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
