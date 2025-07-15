import axios from "axios";
const api = process.env.REACT_APP_API_URL;

// Perfis disponíveis
export async function getPerfis() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${api}/permissoes/perfis`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data; // Ex: ["admin", "operador", "cliente"]
  } catch {
    return [];
  }
}

// Permissões do perfil
export async function getPermissoes(perfil) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${api}/permissoes/${perfil}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data; // Ex: { clientes: ["visualizar", "editar"], ... }
  } catch {
    return {};
  }
}

// Atualizar permissões do perfil
export async function atualizarPermissoes(perfil, permissoes) {
  const token = localStorage.getItem("token");
  return axios.put(`${api}/permissoes/${perfil}`, permissoes, {
    headers: { Authorization: `Bearer ${token}` }
  });
}
