import React, { useEffect, useState } from 'react';
import { listarVendas, criarVenda, atualizarVenda, removerVenda } from './vendaService';
import VendaModal from './VendaModal';

export default function VendasPage() {
  const [vendas, setVendas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    const { data } = await listarVendas();
    setVendas(data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (data) => {
    if (data.id) await atualizarVenda(data.id, data);
    else await criarVenda(data);
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
      await removerVenda(id);
      fetchData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Vendas</h2>
      <button className="btn btn-primary mb-2" onClick={() => { setEditData(null); setModalOpen(true); }}>
        Nova Venda
      </button>
      <table className="min-w-full bg-white rounded-xl shadow">
        <thead>
          <tr>
            <th className="p-2">Cliente</th>
            <th className="p-2">Usuário</th>
            <th className="p-2">Valor Total</th>
            <th className="p-2">Status</th>
            <th className="p-2">Data</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((v) => (
            <tr key={v.id}>
              <td className="p-2">{v.cliente_id}</td>
              <td className="p-2">{v.usuario_id}</td>
              <td className="p-2">R$ {v.valor_total}</td>
              <td className="p-2">{v.status}</td>
              <td className="p-2">{v.data && v.data.split('T')[0]}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleEdit(v)} className="btn btn-sm btn-outline">Editar</button>
                <button onClick={() => handleDelete(v.id)} className="btn btn-sm btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <VendaModal
          data={editData}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
