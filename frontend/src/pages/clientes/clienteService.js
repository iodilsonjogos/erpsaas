import axios from "axios";
const api = process.env.REACT_APP_API_URL;

export async function getClientes() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/clientes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function criarCliente(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/clientes`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function editarCliente(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/clientes/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function excluirCliente(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/clientes/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export async function criarAgendamentoCliente(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/meus-agendamentos`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
export async function editarAgendamentoCliente(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/meus-agendamentos/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
