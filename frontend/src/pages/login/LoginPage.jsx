import React, { useState } from "react";
import axios from "axios";

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/usuarios/login",
        form
      );
      localStorage.setItem("token", res.data.token);
      if (onLogin) onLogin(); // Para redirecionar se quiser
      window.location.href = "/"; // Redireciona para dashboard
    } catch (err) {
      setErro("Usuário ou senha inválidos!");
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl mb-4 font-bold">Login ERP SaaS</h2>
        <label htmlFor="email">E-mail:</label>
        <input
          name="email"
          type="email"
          placeholder="E-mail"
          className="border p-2 mb-2 w-full rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          className="border p-2 mb-4 w-full rounded"
          value={form.senha}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded font-bold"
        >
          Entrar
        </button>
        {erro && <div className="text-red-600 mt-2">{erro}</div>}
      </form>
    </div>
  );
}
