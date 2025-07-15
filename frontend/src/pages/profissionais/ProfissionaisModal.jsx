import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarProfissional, editarProfissional } from "./profissionaisService";

export default function ProfissionaisModal({ open, setOpen, profissional, onRefresh }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    especialidade: "",
    telefone: "",
    status: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profissional) setForm(profissional);
    else setForm({ nome: "", email: "", especialidade: "", telefone: "", status: true });
  }, [profissional, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (profissional && profissional.id) {
        await editarProfissional(profissional.id, form);
      } else {
        await criarProfissional(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar profissional!");
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
          {profissional ? "Editar Profissional" : "Novo Profissional"}
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
          label="Especialidade"
          name="especialidade"
          value={form.especialidade || ""}
          onChange={handleChange}
        />
        <FormInput
          label="Telefone"
          name="telefone"
          value={form.telefone || ""}
          onChange={handleChange}
        />
        <div className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={handleChange}
            id="status"
          />
          <label htmlFor="status">Ativo</label>
        </div>
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
