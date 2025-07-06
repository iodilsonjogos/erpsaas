import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar ou editar bloqueio de horário.
 * Props: open (boolean), setOpen (função), bloqueio (objeto ou null)
 */
export default function BloqueioModal({ open, setOpen, bloqueio }) {
  const [form, setForm] = useState({
    data: "",
    hora_inicio: "",
    hora_fim: "",
    profissional: "",
    motivo: "",
  });

  useEffect(() => {
    if (bloqueio) setForm(bloqueio);
    else setForm({ data: "", hora_inicio: "", hora_fim: "", profissional: "", motivo: "" });
  }, [bloqueio, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de salvar/editar bloqueio (chamar service)
    setOpen(false);
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
          label="Data"
          name="data"
          type="date"
          value={form.data}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Início"
          name="hora_inicio"
          type="time"
          value={form.hora_inicio}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Fim"
          name="hora_fim"
          type="time"
          value={form.hora_fim}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Profissional"
          name="profissional"
          value={form.profissional}
          onChange={handleChange}
        />
        <FormInput
          label="Motivo"
          name="motivo"
          value={form.motivo}
          onChange={handleChange}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
