import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AgendaModal({ data, onClose, onSave }) {
  const [form, setForm] = useState(data || {
    data: '', hora: '', cliente_id: '', profissional_id: '',
    servico: '', valor: '', obs: ''
  });

  const [clientes, setClientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(process.env.REACT_APP_API_URL + '/clientes', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setClientes(res.data));

    axios.get(process.env.REACT_APP_API_URL + '/profissionais', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProfissionais(res.data));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form className="bg-white rounded-2xl p-6 shadow-xl min-w-[340px]" onSubmit={handleSubmit}>
        <h3 className="font-bold text-lg mb-4">{form.id ? "Editar" : "Novo"} Agendamento</h3>
        <div className="mb-2">
          <label>Data</label>
          <input type="date" name="data" className="input input-bordered w-full" value={form.data} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Hora</label>
          <input type="time" name="hora" className="input input-bordered w-full" value={form.hora} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Cliente</label>
          <select name="cliente_id" className="input input-bordered w-full" value={form.cliente_id} onChange={handleChange} required>
            <option value="">Selecione</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label>Profissional</label>
          <select name="profissional_id" className="input input-bordered w-full" value={form.profissional_id} onChange={handleChange} required>
            <option value="">Selecione</option>
            {profissionais.map(p => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label>Serviço</label>
          <input type="text" name="servico" className="input input-bordered w-full" value={form.servico} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Valor</label>
          <input type="number" name="valor" step="0.01" className="input input-bordered w-full" value={form.valor} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <label>Observações</label>
          <input type="text" name="obs" className="input input-bordered w-full" value={form.obs} onChange={handleChange} />
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary">Salvar</button>
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
