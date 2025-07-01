import React, { useState, useEffect } from "react";
import axios from "axios";

// Modal de cadastro/edição (simples, pode evoluir)
function UsuarioModal({ open, onClose, usuario, onSave }) {
  const [form, setForm] = useState(usuario || { nome: "", email: "", senha: "", perfil: "operador", empresa_id: 1, ativo: 1 });

  useEffect(() => {
    if (usuario) setForm(usuario);
    else setForm({ nome: "", email: "", senha: "", perfil: "operador", empresa_id: 1, ativo: 1 });
  }, [usuario, open]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 min-w-[300px] shadow-lg">
        <h2 className="text-lg font-bold mb-4">{usuario ? "Editar" : "Novo"} Usuário</h2>
        <form onSubmit={handleSubmit}>
          <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required className="border p-2 mb-2 w-full rounded" />
          <input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} required className="border p-2 mb-2 w-full rounded" />
          <input name="senha" placeholder="Senha" type="password" value={form.senha} onChange={handleChange} required={!usuario} className="border p-2 mb-2 w-full rounded" />
          <select name="perfil" value={form.perfil} onChange={handleChange} className="border p-2 mb-2 w-full rounded">
            <option value="admin">Admin</option>
            <option value="operador">Operador</option>
          </select>
          <select name="ativo" value={form.ativo} onChange={handleChange} className="border p-2 mb-4 w-full rounded">
            <option value={1}>Ativo</option>
            <option value={0}>Inativo</option>
          </select>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold">Salvar</button>
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  async function fetchUsuarios() {
    const res = await axios.get(process.env.REACT_APP_API_URL + "/usuarios", { headers });
    setUsuarios(res.data);
  }

  useEffect(() => {
    fetchUsuarios();
    // eslint-disable-next-line
  }, []);

  async function handleSave(form) {
    if (usuarioEdit) {
      await axios.put(process.env.REACT_APP_API_URL + `/usuarios/${usuarioEdit.id}`, form, { headers });
    } else {
      await axios.post(process.env.REACT_APP_API_URL + "/usuarios", form, { headers });
    }
    setModalOpen(false);
    setUsuarioEdit(null);
    fetchUsuarios();
  }

  async function handleDelete(id) {
    if (window.confirm("Deseja excluir este usuário?")) {
      await axios.delete(process.env.REACT_APP_API_URL + `/usuarios/${id}`, { headers });
      fetchUsuarios();
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Usuários</h1>
      <button className="bg-green-600 text-white px-4 py-2 rounded mb-4" onClick={() => { setUsuarioEdit(null); setModalOpen(true); }}>
        Novo Usuário
      </button>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Nome</th>
            <th>E-mail</th>
            <th>Perfil</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nome}</td>
              <td>{u.email}</td>
              <td>{u.perfil}</td>
              <td>{u.ativo ? "Ativo" : "Inativo"}</td>
              <td>
                <button className="bg-blue-600 text-white px-2 py-1 rounded mr-2" onClick={() => { setUsuarioEdit(u); setModalOpen(true); }}>Editar</button>
                <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(u.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UsuarioModal open={modalOpen} onClose={() => setModalOpen(false)} usuario={usuarioEdit} onSave={handleSave} />
    </div>
  );
}
