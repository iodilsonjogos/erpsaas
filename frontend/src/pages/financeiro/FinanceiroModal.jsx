import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarLancamento, editarLancamento } from "./financeiroService";

export default function FinanceiroModal({ open, setOpen, lancamento, onRefresh }) {
  const [form, setForm] = useState({
    tipo: "Receita",
    categoria: "",
    valor: "",
    data: "",
    observacao: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lancamento)
      setForm({
        ...lancamento,
        data: lancamento.data ? lancamento.data.split("T")[0] : ""
      });
    else setForm({
      tipo: "Receita",
      categoria: "",
      valor: "",
      data: "",
      observacao: ""
    });
  }, [lancamento, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (lancamento && lancamento.id) {
        await editarLancamento(lancamento.id, form);
      } else {
        await criarLancamento(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar lançamento!");
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
          {lancamento ? "Editar Lançamento" : "Novo Lançamento"}
        </h2>
        <div className="mb-3">
          <label className="block mb-1">Tipo</label>
          <select className="w-full border rounded p-2" name="tipo" value={form.tipo} onChange={handleChange} required>
            <option value="Receita">Receita</option>
            <option value="Despesa">Despesa</option>
          </select>
        </div>
        <FormInput
          label="Categoria"
          name="categoria"
          value={form.categoria || ""}
          onChange={handleChange}
          required
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
          label="Data"
          name="data"
          type="date"
          value={form.data || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Observação"
          name="observacao"
          value={form.observacao || ""}
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
