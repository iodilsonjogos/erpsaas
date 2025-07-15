import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar clientes na fila de espera
export async function getFilaEspera() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/filaespera`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar registro
export async function criarFilaEspera(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/filaespera`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar registro
export async function editarFilaEspera(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/filaespera/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir registro
export async function excluirFilaEspera(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/filaespera/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
