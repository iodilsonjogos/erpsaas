import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar ou editar produto.
 * Props: open (boolean), setOpen (função), produto (objeto ou null)
 */
export default function ProdutosModal({ open, setOpen, produto }) {
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    preco: "",
    estoque: "",
    ativo: true,
  });

  useEffect(() => {
    if (produto) setForm(produto);
    else setForm({ nome: "", categoria: "", preco: "", estoque: "", ativo: true });
  }, [produto, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
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
          {produto ? "Editar Produto" : "Novo Produto"}
        </h2>
        <FormInput
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Categoria"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
        />
        <FormInput
          label="Preço"
          name="preco"
          type="number"
          value={form.preco}
          onChange={handleChange}
        />
        <FormInput
          label="Estoque"
          name="estoque"
          type="number"
          value={form.estoque}
          onChange={handleChange}
        />
        <div className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="ativo"
            checked={form.ativo}
            onChange={handleChange}
            id="ativo"
          />
          <label htmlFor="ativo">Ativo</label>
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
