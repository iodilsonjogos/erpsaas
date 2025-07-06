// /frontend/src/pages/onboarding/onboardingService.js
import axios from "axios";

// Função para listar passos/dicas de onboarding
export async function getOnboardingSteps() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/onboarding", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Adicione funções para criar, editar, excluir dicas/passos
