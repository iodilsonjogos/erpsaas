// /frontend/src/pages/usuarios/usuariosService.js
import axios from "axios";

// Função para listar usuários
export async function getUsuarios() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/usuarios", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir usuários
