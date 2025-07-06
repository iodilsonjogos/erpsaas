import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/config/empresa';

export default function EmpresaPage() {
  const [empresa, setEmpresa] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchEmpresa = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmpresa(data);
      setForm(data);
    };
    fetchEmpresa();
  }, []);

  const handleLogoUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('logo', file);
    const token = localStorage.getItem('token');
    const res = await axios.post(
      process.env.REACT_APP_API_URL + '/config/empresa/upload-logo',
      formData,
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
    );
    setForm({ ...form, logo: res.data.logo });
  };
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    await axios.put(apiUrl, form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEditMode(false);
    setEmpresa(form);
    alert('Dados atualizados!');
  };

  if (!empresa) return <div>Carregando...</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="max-w-2xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Configurações da Empresa</h2>
          {!editMode ? (
            <div>
              <p><strong>Nome:</strong> {empresa.nome}</p>
              <p><strong>CNPJ:</strong> {empresa.cnpj}</p>
              <p><strong>Endereço:</strong> {empresa.endereco}</p>
              <p><strong>Telefone:</strong> {empresa.telefone}</p>
              <p><strong>Email:</strong> {empresa.email}</p>
              <p><strong>Plano ID:</strong> {empresa.plano_id}</p>
              {empresa.logo && (
                <img src={process.env.REACT_APP_API_URL.replace('/api', '') + empresa.logo} alt="Logo" style={{ height: 60, marginTop: 10 }} />
              )}
              <button className="btn btn-primary mt-4" onClick={() => setEditMode(true)}>Editar</button>
            </div>
          ) : (
            <form className="bg-white rounded-2xl p-6 shadow-xl" onSubmit={e => { e.preventDefault(); handleSave(); }}>
              <div className="mb-2">
                <label>Nome</label>
                <input type="text" name="nome" className="input input-bordered w-full" value={form.nome || ''} onChange={handleChange} />
              </div>
              <div className="mb-2">
                <label>CNPJ</label>
                <input type="text" name="cnpj" className="input input-bordered w-full" value={form.cnpj || ''} onChange={handleChange} />
              </div>
              <div className="mb-2">
                <label>Endereço</label>
                <input type="text" name="endereco" className="input input-bordered w-full" value={form.endereco || ''} onChange={handleChange} />
              </div>
              <div className="mb-2">
                <label>Telefone</label>
                <input type="text" name="telefone" className="input input-bordered w-full" value={form.telefone || ''} onChange={handleChange} />
              </div>
              <div className="mb-2">
                <label>Email</label>
                <input type="email" name="email" className="input input-bordered w-full" value={form.email || ''} onChange={handleChange} />
              </div>
              <div className="mb-2">
                <label>Plano ID</label>
                <input type="number" name="plano_id" className="input input-bordered w-full" value={form.plano_id || ''} onChange={handleChange} />
              </div>
              <div className="mb-2">
                <label>Logo</label>
                <input type="file" accept="image/*" onChange={handleLogoUpload} />
                {form.logo && (
                  <img src={process.env.REACT_APP_API_URL.replace('/api', '') + form.logo} alt="Logo" style={{ height: 60, marginTop: 10 }} />
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <button type="submit" className="btn btn-primary">Salvar</button>
                <button type="button" className="btn btn-outline" onClick={() => setEditMode(false)}>Cancelar</button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
