// /frontend/src/pages/checklist/checklistService.js
import axios from "axios";

// Função para listar checklist
export async function getChecklist() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/checklist", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir itens do checklist
