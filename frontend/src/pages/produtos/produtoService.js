// /frontend/src/pages/produtos/produtosService.js
import axios from "axios";

// Função para listar produtos
export async function getProdutos() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/produtos", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir produtos
