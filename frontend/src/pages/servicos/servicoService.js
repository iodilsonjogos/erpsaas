// /frontend/src/pages/servicos/servicosService.js
import axios from "axios";

// Função para listar serviços
export async function getServicos() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/servicos", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir serviços
