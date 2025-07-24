import axios from "axios";

// Busca o progresso do onboarding para o usuário logado
export async function getProgresso(token) {
  const resp = await axios.get("/api/onboarding/progresso", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return resp.data;
}

// Marca o passo como concluído para o usuário logado
export async function concluirPasso(passo, token) {
  await axios.post(
    "/api/onboarding/concluir-passo",
    { passo },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}
