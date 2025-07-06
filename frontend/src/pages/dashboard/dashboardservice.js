// /frontend/src/pages/dashboard/dashboardService.js

import axios from "axios";

// Exemplo de função para buscar dados do dashboard (substitua URL pelo seu backend)
export async function getIndicadoresDashboard(token) {
  const response = await axios.get("/api/dashboard/indicadores", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
}

// Você pode criar outras funções para gráficos, relatórios, etc.
