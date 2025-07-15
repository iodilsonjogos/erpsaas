import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarPlano, editarPlano } from "./planosService";

export default function PlanoModal({ open, setOpen, plano, onRefresh }) {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    valor: "",
    usuarios: "",
    recursos: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (plano) setForm(plano);
    else setForm({ nome: "", descricao: "", valor: "", usuarios: "", recursos: "" });
  }, [plano, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (plano && plano.id) {
        await editarPlano(plano.id, form);
      } else {
        await criarPlano(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar plano!");
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
          {plano ? "Editar Plano" : "Novo Plano"}
        </h2>
        <FormInput
          label="Nome"
          name="nome"
          value={form.nome || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Descrição"
          name="descricao"
          value={form.descricao || ""}
          onChange={handleChange}
        />
        <FormInput
          label="Valor"
          name="valor"
          type="number"
          value={form.valor || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Nº Máximo de Usuários"
          name="usuarios"
          type="number"
          value={form.usuarios || ""}
          onChange={handleChange}
        />
        <FormInput
          label="Recursos"
          name="recursos"
          value={form.recursos || ""}
          onChange={handleChange}
          placeholder="Recursos/limites do plano"
        />
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
