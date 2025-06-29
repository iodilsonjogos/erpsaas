import React, { useState } from 'react';

export default function FinanceiroModal({ data, onClose, onSave }) {
  const [form, setForm] = useState(data || {
    tipo: 'entrada', descricao: '', categoria: '', valor: '', data: '', forma_pagamento: '', observacoes: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form className="bg-white rounded-2xl p-6 shadow-xl min-w-[340px]" onSubmit={handleSubmit}>
        <h3 className="font-bold text-lg mb-4">{form.id ? "Editar" : "Novo"} Lançamento</h3>
        <div className="mb-2">
          <label>Tipo</label>
          <select name="tipo" className="input input-bordered w-full" value={form.tipo} onChange={handleChange}>
            <option value="entrada">Entrada</option>
            <option value="saida">Saída</option>
          </select>
        </div>
        <div className="mb-2">
          <label>Descrição</label>
          <input type="text" name="descricao" className="input input-bordered w-full" value={form.descricao} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Categoria</label>
          <input type="text" name="categoria" className="input input-bordered w-full" value={form.categoria} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Valor</label>
          <input type="number" name="valor" step="0.01" className="input input-bordered w-full" value={form.valor} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Data</label>
          <input type="date" name="data" className="input input-bordered w-full" value={form.data} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Forma de Pagamento</label>
          <input type="text" name="forma_pagamento" className="input input-bordered w-full" value={form.forma_pagamento} onChange={handleChange} />
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
