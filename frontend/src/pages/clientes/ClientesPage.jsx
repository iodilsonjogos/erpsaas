import React, { useEffect, useState } from 'react';
import { listarClientes, criarCliente, atualizarCliente, removerCliente } from './clienteService';
import ClienteModal from './ClienteModal';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    const { data } = await listarClientes();
    setClientes(data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (data) => {
    if (data.id) await atualizarCliente(data.id, data);
    else await criarCliente(data);
    setModalOpen(false);
    setEditData(null);
    fetchData();
  };

  const handleEdit = (item) => {
    setEditData(item);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmar exclusão?')) {
      await removerCliente(id);
      fetchData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Clientes</h2>
      <button className="btn btn-primary mb-2" onClick={() => { setEditData(null); setModalOpen(true); }}>
        Novo Cliente
      </button>
      <table className="min-w-full bg-white rounded-xl shadow">
        <thead>
          <tr>
            <th className="p-2">Nome</th>
            <th className="p-2">Telefone</th>
            <th className="p-2">Email</th>
            <th className="p-2">Observações</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td className="p-2">{c.nome}</td>
              <td className="p-2">{c.telefone}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">{c.observacoes}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleEdit(c)} className="btn btn-sm btn-outline">Editar</button>
                <button onClick={() => handleDelete(c.id)} className="btn btn-sm btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <ClienteModal
          data={editData}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
