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

/**
 * ===== Funções adicionadas para a HomePage.jsx =====
 * Essas funções estão mockadas (dados fake), prontos para substituir pelas rotas reais da sua API depois!
 */

// Profissionais ativos (mock)
export async function getProfissionaisAtivos() {
  // Quando tiver a rota real, basta substituir pelo axios.get() correto!
  return [
    {
      id: 1,
      nome: "Maria Silva",
      avatar: null,
      agendamentos_hoje: 6
    },
    {
      id: 2,
      nome: "João Souza",
      avatar: null,
      agendamentos_hoje: 3
    }
  ];
}

// Agendamentos do dia (mock)
export async function getAgendamentosDia() {
  // Substitua por chamada real se já tiver endpoint
  return [
    {
      id: 1,
      title: "Corte Feminino - Maria Silva",
      start: new Date().toISOString().split("T")[0] + "T09:30:00",
      end: new Date().toISOString().split("T")[0] + "T10:00:00"
    },
    {
      id: 2,
      title: "Barba - João Souza",
      start: new Date().toISOString().split("T")[0] + "T10:30:00",
      end: new Date().toISOString().split("T")[0] + "T11:00:00"
    }
  ];
}

// Datas especiais (mock)
export async function getDatasEspeciais() {
  // Depois troque por rota real (ex: aniversários, feriados, etc)
  return [
    { nome: "Aniversário da Ana", data: "05/08" },
    { nome: "Feriado Nacional", data: "07/09" }
  ];
}

// Lista de espera (mock)
export async function getListaEspera() {
  // Substitua por sua rota real!
  return [
    { nome: "Pedro Borges", tempo_espera: "15 min" },
    { nome: "Paula Lima", tempo_espera: "7 min" }
  ];
}
