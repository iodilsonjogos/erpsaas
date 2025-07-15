import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarContato, editarContato } from "./contatoService";

export default function ContatoModal({ open, setOpen, contato, onRefresh }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
    resposta: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (contato) setForm(contato);
    else setForm({ nome: "", email: "", assunto: "", mensagem: "", resposta: "" });
  }, [contato, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (contato && contato.id) {
        await editarContato(contato.id, form);
      } else {
        await criarContato(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar contato!");
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {contato ? "Responder Contato" : "Novo Contato"}
        </h2>
        <FormInput
          label="Nome"
          name="nome"
          value={form.nome || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={form.email || ""}
          onChange={handleChange}
        />
        <FormInput
          label="Assunto"
          name="assunto"
          value={form.assunto || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Mensagem"
          name="mensagem"
          value={form.mensagem || ""}
          onChange={handleChange}
          required
        />
        {contato && (
          <FormInput
            label="Resposta"
            name="resposta"
            value={form.resposta || ""}
            onChange={handleChange}
          />
        )}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
