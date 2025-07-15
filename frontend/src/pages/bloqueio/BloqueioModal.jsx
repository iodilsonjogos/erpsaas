import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarBloqueio, editarBloqueio } from "./bloqueioService";

export default function BloqueioModal({ open, setOpen, bloqueio, onRefresh }) {
  const [form, setForm] = useState({
    profissional_nome: "",
    data: "",
    hora_inicio: "",
    hora_fim: "",
    motivo: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bloqueio)
      setForm({
        ...bloqueio,
        data: bloqueio.data ? bloqueio.data.split("T")[0] : ""
      });
    else setForm({
      profissional_nome: "",
      data: "",
      hora_inicio: "",
      hora_fim: "",
      motivo: ""
    });
  }, [bloqueio, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (bloqueio && bloqueio.id) {
        await editarBloqueio(bloqueio.id, form);
      } else {
        await criarBloqueio(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar bloqueio!");
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
          {bloqueio ? "Editar Bloqueio" : "Novo Bloqueio"}
        </h2>
        <FormInput
          label="Profissional"
          name="profissional_nome"
          value={form.profissional_nome || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Data"
          name="data"
          type="date"
          value={form.data || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Hora Início"
          name="hora_inicio"
          type="time"
          value={form.hora_inicio || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Hora Fim"
          name="hora_fim"
          type="time"
          value={form.hora_fim || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Motivo"
          name="motivo"
          value={form.motivo || ""}
          onChange={handleChange}
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
