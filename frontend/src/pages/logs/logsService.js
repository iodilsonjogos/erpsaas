// /frontend/src/pages/logs/logsService.js
import axios from "axios";

// Função para listar logs do sistema
export async function getLogs() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/logs", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}
