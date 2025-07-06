// /frontend/src/pages/home/homeService.js
import axios from "axios";

// Função para buscar resumos do usuário logado
export async function getResumoHome() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/home/resumo", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return {};
  }
}
