// /frontend/src/pages/configuracoes/configuracoesService.js
import axios from "axios";

// Função para buscar as configurações da empresa
export async function getConfiguracoes() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/config/empresa", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return null;
  }
}

// Adicione função para salvar (PUT) configurações se desejar.
