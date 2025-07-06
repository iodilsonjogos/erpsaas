import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar ou editar dica/passo do onboarding.
 * Props: open (boolean), setOpen (função), step (objeto ou null)
 */
export default function OnboardingModal({ open, setOpen, step }) {
  const [form, setForm] = useState({
    titulo: "",
    descricao: ""
  });

  useEffect(() => {
    if (step) setForm(step);
    else setForm({ titulo: "", descricao: "" });
  }, [step, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de salvar/editar passo ou dica (chamar service)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {step ? "Editar Passo/Dica" : "Novo Passo/Dica"}
        </h2>
        <FormInput
          label="Título"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          required
        />
        <div className="mb-3">
          <label className="block mb-1">Descrição</label>
          <textarea
            className="w-full border rounded p-2"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            required
          />
        </div>
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
