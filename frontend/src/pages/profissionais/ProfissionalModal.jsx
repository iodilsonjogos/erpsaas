import React, { useState } from 'react';

export default function ProfissionalModal({ data, onClose, onSave }) {
  const [form, setForm] = useState(data || {
    nome: '', especialidade: '', ativo: 1
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form className="bg-white rounded-2xl p-6 shadow-xl min-w-[340px]" onSubmit={handleSubmit}>
        <h3 className="font-bold text-lg mb-4">{form.id ? "Editar" : "Novo"} Profissional</h3>
        <div className="mb-2">
          <label>Nome</label>
          <input type="text" name="nome" className="input input-bordered w-full" value={form.nome} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Especialidade</label>
          <input type="text" name="especialidade" className="input input-bordered w-full" value={form.especialidade} onChange={handleChange} />
        </div>
        <div className="mb-2 flex items-center">
          <input
            type="checkbox"
            name="ativo"
            checked={!!form.ativo}
            onChange={handleChange}
            className="mr-2"
            id="ativo"
          />
          <label htmlFor="ativo">Ativo</label>
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary">Salvar</button>
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
