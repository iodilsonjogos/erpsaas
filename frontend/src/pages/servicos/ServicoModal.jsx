import React, { useState } from 'react';

export default function ServicoModal({ data, onClose, onSave }) {
  const [form, setForm] = useState(data || {
    nome: '', preco: '', duracao_minutos: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form className="bg-white rounded-2xl p-6 shadow-xl min-w-[340px]" onSubmit={handleSubmit}>
        <h3 className="font-bold text-lg mb-4">{form.id ? "Editar" : "Novo"} Serviço</h3>
        <div className="mb-2">
          <label>Nome</label>
          <input type="text" name="nome" className="input input-bordered w-full" value={form.nome} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Preço</label>
          <input type="number" name="preco" step="0.01" className="input input-bordered w-full" value={form.preco} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Duração (min)</label>
          <input type="number" name="duracao_minutos" className="input input-bordered w-full" value={form.duracao_minutos} onChange={handleChange} />
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary">Salvar</button>
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
