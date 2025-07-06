// /frontend/src/pages/permissoes/permissoesService.js
import axios from "axios";

// Função para listar permissões/ACL
export async function getPermissoes() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/permissoes", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar permissões
