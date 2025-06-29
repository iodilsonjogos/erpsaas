import React, { useState } from 'react';

export default function ProdutoModal({ data, onClose, onSave }) {
  const [form, setForm] = useState(data || {
    nome: '', categoria: '', unidade: '', preco_custo: '', preco_venda: '', estoque: '', observacoes: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form className="bg-white rounded-2xl p-6 shadow-xl min-w-[340px]" onSubmit={handleSubmit}>
        <h3 className="font-bold text-lg mb-4">{form.id ? "Editar" : "Novo"} Produto</h3>
        <div className="mb-2">
          <label>Nome</label>
          <input type="text" name="nome" className="input input-bordered w-full" value={form.nome} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Categoria</label>
          <input type="text" name="categoria" className="input input-bordered w-full" value={form.categoria} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Unidade</label>
          <input type="text" name="unidade" className="input input-bordered w-full" value={form.unidade} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Preço de Custo</label>
          <input type="number" name="preco_custo" step="0.01" className="input input-bordered w-full" value={form.preco_custo} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Preço de Venda</label>
          <input type="number" name="preco_venda" step="0.01" className="input input-bordered w-full" value={form.preco_venda} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Estoque</label>
          <input type="number" name="estoque" step="0.01" className="input input-bordered w-full" value={form.estoque} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Observações</label>
          <input type="text" name="observacoes" className="input input-bordered w-full" value={form.observacoes} onChange={handleChange} />
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary">Salvar</button>
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
