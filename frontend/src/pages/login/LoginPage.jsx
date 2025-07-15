import React, { useState } from "react";
import { login } from "./loginService";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [logado, setLogado] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);
    try {
      const res = await login(form.email, form.senha);
      localStorage.setItem("token", res.token);
      setLogado(true);
      // Redirecionar para a rota principal do sistema após login:
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (err) {
      setErro("Usuário ou senha inválidos.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Acesse o sistema</h2>
        <input
          type="email"
          name="email"
          className="border rounded p-3 w-full mb-3"
          placeholder="Seu e-mail"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          className="border rounded p-3 w-full mb-3"
          placeholder="Sua senha"
          value={form.senha}
          onChange={handleChange}
          required
        />
        {erro && <div className="mb-3 text-red-700 text-center">{erro}</div>}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white font-bold py-3 rounded mt-2"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
        {logado && <div className="text-green-700 text-center mt-3">Login realizado! Redirecionando...</div>}
      </form>
    </div>
  );
}
