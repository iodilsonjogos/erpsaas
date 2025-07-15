import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarVenda, editarVenda } from "./vendasService";

export default function VendasModal({ open, setOpen, venda, onRefresh }) {
  const [form, setForm] = useState({
    cliente_nome: "",
    itens: [],
    valor_total: "",
    status: "Pendente",
    data: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (venda) setForm(venda);
    else setForm({ cliente_nome: "", itens: [], valor_total: "", status: "Pendente", data: "" });
  }, [venda, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Itens da venda (simplificado, você pode adaptar para adicionar/remover vários itens)
  function handleItensChange(idx, field, value) {
    const itens = form.itens.map((item, i) => i === idx ? { ...item, [field]: value } : item);
    setForm({ ...form, itens });
  }
  function addItem() {
    setForm({ ...form, itens: [...form.itens, { produto: "", quantidade: 1, valor: "" }] });
  }
  function removeItem(idx) {
    setForm({ ...form, itens: form.itens.filter((_, i) => i !== idx) });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (venda && venda.id) {
        await editarVenda(venda.id, form);
      } else {
        await criarVenda(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar venda!");
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-3">
          {venda ? "Editar Venda" : "Nova Venda"}
        </h2>
        <FormInput
          label="Cliente"
          name="cliente_nome"
          value={form.cliente_nome || ""}
          onChange={handleChange}
          required
        />
        <div className="mb-3">
          <label className="block mb-1 font-bold">Itens</label>
          {form.itens.map((item, idx) => (
            <div className="flex gap-2 mb-1" key={idx}>
              <input
                className="border rounded p-2 flex-1"
                placeholder="Produto"
                value={item.produto}
                onChange={e => handleItensChange(idx, "produto", e.target.value)}
                required
              />
              <input
                className="border rounded p-2 w-20"
                type="number"
                min={1}
                placeholder="Qtd"
                value={item.quantidade}
                onChange={e => handleItensChange(idx, "quantidade", e.target.value)}
                required
              />
              <input
                className="border rounded p-2 w-24"
                type="number"
                placeholder="Valor"
                value={item.valor}
                onChange={e => handleItensChange(idx, "valor", e.target.value)}
                required
              />
              <button type="button" className="text-red-600 px-2" onClick={() => removeItem(idx)}>×</button>
            </div>
          ))}
          <button
            type="button"
            className="text-blue-600 underline text-sm mt-2"
            onClick={addItem}
          >
            + Adicionar item
          </button>
        </div>
        <FormInput
          label="Valor Total"
          name="valor_total"
          type="number"
          value={form.valor_total || ""}
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
          >
            <option value="Pendente">Pendente</option>
            <option value="Pago">Pago</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
        <FormInput
          label="Data"
          name="data"
          type="date"
          value={form.data || ""}
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
