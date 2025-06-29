import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/usuarios/perfil';

export default function UsuarioPage() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(apiUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { setForm(res.data); setLoading(false); });
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    await axios.put(apiUrl, form, { headers: { Authorization: `Bearer ${token}` } });
    alert('Dados atualizados!');
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Minha Conta</h2>
      <form className="bg-white rounded-2xl p-6 shadow-xl" onSubmit={e => { e.preventDefault(); handleSave(); }}>
        <div className="mb-2">
          <label>Nome</label>
          <input type="text" name="nome" className="input input-bordered w-full" value={form.nome || ''} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Email</label>
          <input type="email" name="email" className="input input-bordered w-full" value={form.email || ''} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label>Nova Senha</label>
          <input type="password" name="senha" className="input input-bordered w-full" value={form.senha || ''} onChange={handleChange} />
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="btn btn-primary">Salvar</button>
        </div>
      </form>
    </div>
  );
}
