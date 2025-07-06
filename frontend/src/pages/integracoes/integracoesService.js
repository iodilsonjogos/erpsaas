// /frontend/src/pages/integracoes/integracoesService.js
import axios from "axios";

// Função para listar integrações
export async function getIntegracoes() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/integracoes", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir integrações
