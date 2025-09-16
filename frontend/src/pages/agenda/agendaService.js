import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar agendamentos
export async function getAgendamentos() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/agenda`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar agendamento
export async function criarAgendamento(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/agenda`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar agendamento
export async function editarAgendamento(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/agenda/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir agendamento
export async function excluirAgendamento(id) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${api}/agenda/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erro ao excluir agendamento.";
  }
}
