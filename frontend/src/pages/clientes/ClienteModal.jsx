import React, { useState } from 'react';

export default function ClienteModal({ data, onClose, onSave }) {
  const [form, setForm] = useState(data || {
    nome: '', telefone: '', email: '', observacoes: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form className="bg-white rounded-2xl p-6 shadow-xl min-w-[340px]" onSubmit={handleSubmit}>
        <h3 className="font-bold text-lg mb-4">{form.id ? "Editar" : "Novo"} Cliente</h3>
        <div className="mb-2">
          <label>Nome</label>
          <input type="text" name="nome" className="input input-bordered w-full" value={form.nome} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Telefone</label>
          <input type="text" name="telefone" className="input input-bordered w-full" value={form.telefone} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Email</label>
          <input type="email" name="email" className="input input-bordered w-full" value={form.email} onChange={handleChange} />
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
