import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar produtos
export async function getProdutos() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/produtos`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar produto
export async function criarProduto(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/produtos`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar produto
export async function editarProduto(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/produtos/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir produto
export async function excluirProduto(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/produtos/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
