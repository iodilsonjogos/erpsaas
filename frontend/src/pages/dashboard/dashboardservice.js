import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Indicadores principais
export async function getDashboardResumo() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${api}/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch {
    return {};
  }
}

// Vendas por mês (para gráfico)
export async function getVendasMes() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${api}/dashboard/vendas-mes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch {
    return [];
  }
}

// Produtos mais vendidos (para gráfico)
export async function getProdutosTop() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${api}/dashboard/produtos-top`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch {
    return [];
  }
}
