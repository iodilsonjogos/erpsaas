// /frontend/src/pages/faq/faqService.js
import axios from "axios";

// Função para listar FAQs
export async function getFaqs() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/faq", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir FAQs
