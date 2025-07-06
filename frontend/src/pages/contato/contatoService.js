// /frontend/src/pages/contato/contatoService.js
import axios from "axios";

// Função para listar mensagens de contato recebidas
export async function getMensagensContato() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/contato", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para enviar mensagem de contato/suporte
