import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar ou editar lançamento financeiro.
 * Props: open (boolean), setOpen (função), lancamento (objeto ou null)
 */
export default function FinanceiroModal({ open, setOpen, lancamento }) {
  const [form, setForm] = useState({
    data: "",
    tipo: "Receita",
    descricao: "",
    valor: "",
    categoria: "",
    status: "Pendente"
  });

  useEffect(() => {
    if (lancamento) setForm(lancamento);
    else setForm({
      data: "",
      tipo: "Receita",
      descricao: "",
      valor: "",
      categoria: "",
      status: "Pendente"
    });
  }, [lancamento, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de salvar ou editar (chamar serviço)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {lancamento ? "Editar Lançamento" : "Novo Lançamento"}
        </h2>
        <FormInput
          label="Data"
          name="data"
          type="date"
          value={form.data}
          onChange={handleChange}
          required
        />
        <div className="mb-3">
          <label className="block mb-1">Tipo</label>
          <select
            className="w-full border rounded p-2"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            required
          >
            <option value="Receita">Receita</option>
            <option value="Despesa">Despesa</option>
          </select>
        </div>
        <FormInput
          label="Descrição"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Valor"
          name="valor"
          type="number"
          value={form.valor}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Categoria"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          required
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
            <option value="Pendente">Pendente</option>
            <option value="Pago">Pago</option>
            <option value="Atrasado">Atrasado</option>
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
