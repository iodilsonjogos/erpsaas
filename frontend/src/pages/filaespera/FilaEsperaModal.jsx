import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar ou editar entrada na fila de espera.
 * Props: open (boolean), setOpen (função), registro (objeto ou null)
 */
export default function FilaEsperaModal({ open, setOpen, registro }) {
  const [form, setForm] = useState({
    cliente_nome: "",
    data: "",
    servico: "",
    profissional: "",
    status: "Aguardando",
  });

  useEffect(() => {
    if (registro) setForm(registro);
    else setForm({
      cliente_nome: "",
      data: "",
      servico: "",
      profissional: "",
      status: "Aguardando"
    });
  }, [registro, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de salvar/editar fila de espera (chamar service)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {registro ? "Editar Encaixe" : "Novo Encaixe"}
        </h2>
        <FormInput
          label="Cliente"
          name="cliente_nome"
          value={form.cliente_nome}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Data"
          name="data"
          type="date"
          value={form.data}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Serviço"
          name="servico"
          value={form.servico}
          onChange={handleChange}
        />
        <FormInput
          label="Profissional"
          name="profissional"
          value={form.profissional}
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
            <option value="Aguardando">Aguardando</option>
            <option value="Atendido">Atendido</option>
            <option value="Cancelado">Cancelado</option>
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
