// /frontend/src/pages/comissoes/comissoesService.js
import axios from "axios";

// Função para listar comissões
export async function getComissoes() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/comissoes", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir comissões
