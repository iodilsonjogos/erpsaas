// /frontend/src/pages/agenda/agendaService.js
import axios from "axios";

// Função para listar agendamentos
export async function getAgendamentos() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/agenda", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir agendamento aqui
