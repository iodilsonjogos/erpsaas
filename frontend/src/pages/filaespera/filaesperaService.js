// /frontend/src/pages/filaespera/filaesperaService.js
import axios from "axios";

// Função para listar fila de espera
export async function getFilaEspera() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/filaespera", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir encaixe/fila de espera
