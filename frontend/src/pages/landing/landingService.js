import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Enviar lead/cadastro simples para backend
export async function enviarLead(data) {
  return axios.post(`${api}/landing/leads`, data);
}
