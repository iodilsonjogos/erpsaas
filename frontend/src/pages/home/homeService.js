import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Resumo dos indicadores principais do usuário (não admin)
export async function getResumoHome() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${api}/home`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch {
    return {};
  }
}

// Próximos atendimentos do usuário
export async function getProximosAtendimentos() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${api}/home/proximos-agendamentos`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch {
    return [];
  }
}
