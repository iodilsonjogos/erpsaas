import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarProduto, editarProduto } from "./produtosService";

export default function ProdutosModal({ open, setOpen, produto, onRefresh }) {
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    unidade: "",
    preco: "",
    estoque: "",
    status: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (produto) setForm(produto);
    else setForm({ nome: "", categoria: "", unidade: "", preco: "", estoque: "", status: true });
  }, [produto, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (produto && produto.id) {
        await editarProduto(produto.id, form);
      } else {
        await criarProduto(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar produto!");
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
          {produto ? "Editar Produto" : "Novo Produto"}
        </h2>
        <FormInput
          label="Nome"
          name="nome"
          value={form.nome || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Categoria"
          name="categoria"
          value={form.categoria || ""}
          onChange={handleChange}
        />
        <FormInput
          label="Unidade"
          name="unidade"
          value={form.unidade || ""}
          onChange={handleChange}
        />
        <FormInput
          label="Preço"
          name="preco"
          type="number"
          value={form.preco || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Estoque"
          name="estoque"
          type="number"
          value={form.estoque || ""}
          onChange={handleChange}
        />
        <div className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={handleChange}
            id="status"
          />
          <label htmlFor="status">Ativo</label>
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
