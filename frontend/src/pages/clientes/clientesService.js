// /frontend/src/pages/clientes/clientesService.js
import axios from "axios";

// Função para listar clientes
export async function getClientes() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/clientes", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione aqui funções para criar, editar, excluir clientes

// Função para listar agendamentos do cliente logado
export async function getMeusAgendamentos() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/meus-agendamentos", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}