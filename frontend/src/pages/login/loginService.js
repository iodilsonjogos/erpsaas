import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Realizar login
export async function login(email, senha) {
  const res = await axios.post(`${api}/auth/login`, { email, senha });
  if (res.data && res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}
