import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Listar etapas do onboarding
export async function getEtapasOnboarding() {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${api}/onboarding`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    return [];
  }
}

// Criar etapa
export async function criarEtapaOnboarding(data) {
  const token = localStorage.getItem("token");
  return axios.post(`${api}/onboarding`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Editar etapa
export async function editarEtapaOnboarding(id, data) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/onboarding/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Excluir etapa
export async function excluirEtapaOnboarding(id) {
  const token = localStorage.getItem("token");
  return axios.delete(`${api}/onboarding/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
