// /frontend/src/pages/marketing/marketingService.js
import axios from "axios";

// Função para listar campanhas de marketing
export async function getCampanhas() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/marketing", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir campanhas
