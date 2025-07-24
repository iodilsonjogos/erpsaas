import axios from "axios";

export async function uploadLogo(logoFile, token) {
  const formData = new FormData();
  formData.append("logo", logoFile);
  const response = await axios.post(
    "/api/empresa/upload-logo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function getProgresso(token) {
  const resp = await axios.get("/api/onboarding/progresso", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return resp.data;
}
export async function concluirPasso(passo, token) {
  await axios.post(
    "/api/onboarding/concluir-passo",
    { passo },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}