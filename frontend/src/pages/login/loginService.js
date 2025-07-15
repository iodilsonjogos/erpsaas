import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Realizar login
export async function login(email, senha) {
  const res = await axios.post(`${api}/usuarios/login`, { email, senha });
  return res.data;
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}
