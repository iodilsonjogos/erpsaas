// /frontend/src/pages/avaliacao/avaliacaoService.js
import axios from "axios";

// Função para listar avaliações
export async function getAvaliacoes() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/avaliacoes", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir avaliações
