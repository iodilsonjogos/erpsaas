// /frontend/src/pages/bloqueio/bloqueioService.js
import axios from "axios";

// Função para listar bloqueios de horário
export async function getBloqueios() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/bloqueios", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir bloqueios
