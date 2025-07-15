import React, { useState } from "react";
// import { enviarLead } from "./landingService"; // Se quiser salvar no backend

export default function LandingModal({ open, setOpen }) {
  const [form, setForm] = useState({ nome: "", email: "" });
  const [enviado, setEnviado] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setEnviado(true);
    // await enviarLead(form);
    setTimeout(() => {
      setOpen(false);
      setEnviado(false);
    }, 1200);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-8 rounded-2xl shadow-xl min-w-[320px] max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-4">Teste grátis!</h2>
        <input
          type="text"
          name="nome"
          placeholder="Seu nome"
          className="border rounded p-2 w-full mb-2"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Seu e-mail"
          className="border rounded p-2 w-full mb-2"
          value={form.email}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-700 text-white font-bold py-2 rounded mt-2"
        >
          {enviado ? "Enviado!" : "Quero testar"}
        </button>
        <button
          type="button"
          className="w-full mt-2 text-blue-700 hover:underline"
          onClick={() => setOpen(false)}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
