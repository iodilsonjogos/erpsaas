// /frontend/src/pages/financeiro/financeiroService.js
import axios from "axios";

// Função para listar lançamentos financeiros
export async function getLancamentos() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/financeiro", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir lançamentos
