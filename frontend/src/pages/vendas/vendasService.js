import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar vendas
export async function getVendas() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/vendas`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar venda
export async function criarVenda(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/vendas`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar venda
export async function editarVenda(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/vendas/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir venda
export async function excluirVenda(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/vendas/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
