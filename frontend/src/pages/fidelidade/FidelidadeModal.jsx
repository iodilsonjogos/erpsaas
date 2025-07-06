import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar ou editar programa/registro de fidelidade.
 * Props: open (boolean), setOpen (função), fidelidade (objeto ou null)
 */
export default function FidelidadeModal({ open, setOpen, fidelidade }) {
  const [form, setForm] = useState({
    cliente_nome: "",
    programa: "",
    pontos: "",
    validade: "",
    status: "Ativo",
  });

  useEffect(() => {
    if (fidelidade) setForm(fidelidade);
    else setForm({ cliente_nome: "", programa: "", pontos: "", validade: "", status: "Ativo" });
  }, [fidelidade, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de salvar/editar fidelidade (chamar service)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {fidelidade ? "Editar Fidelidade" : "Novo Programa"}
        </h2>
        <FormInput
          label="Cliente"
          name="cliente_nome"
          value={form.cliente_nome}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Programa"
          name="programa"
          value={form.programa}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Pontos"
          name="pontos"
          type="number"
          value={form.pontos}
          onChange={handleChange}
        />
        <FormInput
          label="Validade"
          name="validade"
          type="date"
          value={form.validade}
          onChange={handleChange}
        />
        <div className="mb-3">
          <label className="block mb-1">Status</label>
          <select
            className="w-full border rounded p-2"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
            <option value="Expirado">Expirado</option>
          </select>
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
