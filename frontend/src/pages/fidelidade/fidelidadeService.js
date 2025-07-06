// /frontend/src/pages/fidelidade/fidelidadeService.js
import axios from "axios";

// Função para listar registros/programas de fidelidade
export async function getFidelidades() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/fidelidade", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir programas
