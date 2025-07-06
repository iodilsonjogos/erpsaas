// /frontend/src/pages/relatorios/relatoriosService.js
import axios from "axios";

// Função para listar relatórios já gerados ou favoritos (ajuste conforme necessidade)
export async function getRelatorios() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/relatorios", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para gerar relatórios, baixar, etc.
