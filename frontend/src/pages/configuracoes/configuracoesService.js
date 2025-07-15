// /frontend/src/pages/configuracoes/configuracoesService.js
import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Buscar configurações da empresa
export async function getConfiguracoes() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/config/empresa`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return null;
  }
}

// Salvar (atualizar) configurações da empresa
export async function salvarConfiguracoes(data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/config/empresa`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
