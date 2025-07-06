import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para visualizar/criar/editar venda.
 * Props: open (boolean), setOpen (função), venda (objeto ou null)
 */
export default function VendasModal({ open, setOpen, venda }) {
  // Exemplo básico; para MVP, lista só os principais campos.
  const [form, setForm] = useState({
    cliente_nome: "",
    data: "",
    valor_total: "",
    status: "Pendente",
  });

  useEffect(() => {
    if (venda) setForm(venda);
    else setForm({ cliente_nome: "", data: "", valor_total: "", status: "Pendente" });
  }, [venda, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de salvar/editar venda (chamar service)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {venda ? "Detalhes da Venda" : "Nova Venda"}
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
          label="Valor Total"
          name="valor_total"
          type="number"
          value={form.valor_total}
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
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setOpen(false)}
          >
            Fechar
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
