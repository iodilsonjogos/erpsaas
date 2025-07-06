// /frontend/src/pages/automacao/automacaoService.js
import axios from "axios";

// Função para listar automações
export async function getAutomacoes() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/automacoes", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir automações
