// /frontend/src/pages/vendas/vendasService.js
import axios from "axios";

// Função para listar vendas
export async function getVendas() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/vendas", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir vendas
