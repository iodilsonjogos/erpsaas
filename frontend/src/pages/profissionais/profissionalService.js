// /frontend/src/pages/profissionais/profissionaisService.js
import axios from "axios";

// Função para listar profissionais
export async function getProfissionais() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/profissionais", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir profissionais
