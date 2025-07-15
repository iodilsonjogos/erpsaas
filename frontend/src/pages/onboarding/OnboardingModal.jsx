import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarEtapaOnboarding, editarEtapaOnboarding } from "./onboardingService";

export default function OnboardingModal({ open, setOpen, etapa, onRefresh }) {
  const [form, setForm] = useState({
    ordem: "",
    titulo: "",
    descricao: "",
    completa: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (etapa) setForm(etapa);
    else setForm({ ordem: "", titulo: "", descricao: "", completa: false });
  }, [etapa, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (etapa && etapa.id) {
        await editarEtapaOnboarding(etapa.id, form);
      } else {
        await criarEtapaOnboarding(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar etapa!");
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
          {etapa ? "Editar Etapa" : "Nova Etapa"}
        </h2>
        <FormInput
          label="Ordem"
          name="ordem"
          type="number"
          value={form.ordem || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Título"
          name="titulo"
          value={form.titulo || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Descrição"
          name="descricao"
          value={form.descricao || ""}
          onChange={handleChange}
        />
        <div className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="completa"
            checked={form.completa}
            onChange={handleChange}
            id="completa"
          />
          <label htmlFor="completa">Completa</label>
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
