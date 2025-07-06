// /frontend/src/pages/planos/planosService.js
import axios from "axios";

// Função para listar planos SaaS
export async function getPlanos() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/planos", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir planos
