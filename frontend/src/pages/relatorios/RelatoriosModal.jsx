import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para gerar relatórios com filtros.
 * Props: open (boolean), setOpen (função), filtro (objeto ou null)
 */
export default function RelatoriosModal({ open, setOpen, filtro }) {
  const [form, setForm] = useState({
    tipo: "Vendas",
    data_inicio: "",
    data_fim: "",
    formato: "Excel",
  });

  useEffect(() => {
    if (filtro) setForm(filtro);
    else setForm({ tipo: "Vendas", data_inicio: "", data_fim: "", formato: "Excel" });
  }, [filtro, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de gerar/filtrar relatório (chamar serviço)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          Gerar Relatório
        </h2>
        <div className="mb-3">
          <label className="block mb-1">Tipo de Relatório</label>
          <select
            className="w-full border rounded p-2"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            required
          >
            <option value="Vendas">Vendas</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Produtos">Produtos</option>
            <option value="Agenda">Agenda</option>
          </select>
        </div>
        <FormInput
          label="Data início"
          name="data_inicio"
          type="date"
          value={form.data_inicio}
          onChange={handleChange}
        />
        <FormInput
          label="Data fim"
          name="data_fim"
          type="date"
          value={form.data_fim}
          onChange={handleChange}
        />
        <div className="mb-3">
          <label className="block mb-1">Formato</label>
          <select
            className="w-full border rounded p-2"
            name="formato"
            value={form.formato}
            onChange={handleChange}
            required
          >
            <option value="Excel">Excel</option>
            <option value="PDF">PDF</option>
            <option value="JSON">JSON</option>
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
            Gerar
          </button>
        </div>
      </form>
    </div>
  );
}
