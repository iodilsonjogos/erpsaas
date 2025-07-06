// /frontend/src/pages/notificacoes/notificacoesService.js
import axios from "axios";

// Função para listar notificações internas
export async function getNotificacoes() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/notificacoes", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para enviar notificações internas
