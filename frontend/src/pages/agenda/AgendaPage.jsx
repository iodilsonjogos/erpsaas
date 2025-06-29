import React, { useEffect, useState } from 'react';
import { listarAgendamentos, criarAgendamento, atualizarAgendamento, removerAgendamento } from './agendaService';
import AgendaModal from './AgendaModal';

export default function AgendaPage() {
  const [agendas, setAgendas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    const { data } = await listarAgendamentos();
    setAgendas(data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (data) => {
    if (data.id) await atualizarAgendamento(data.id, data);
    else await criarAgendamento(data);
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
      await removerAgendamento(id);
      fetchData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Agenda</h2>
      <button className="btn btn-primary mb-2" onClick={() => { setEditData(null); setModalOpen(true); }}>
        Novo Agendamento
      </button>
      <table className="min-w-full bg-white rounded-xl shadow">
        <thead>
          <tr>
            <th className="p-2">Data</th>
            <th className="p-2">Hora</th>
            <th className="p-2">Cliente</th>
            <th className="p-2">Profissional</th>
            <th className="p-2">Serviço</th>
            <th className="p-2">Valor</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {agendas.map((a) => (
            <tr key={a.id}>
              <td className="p-2">{a.data}</td>
              <td className="p-2">{a.hora}</td>
              <td className="p-2">{a.cliente_id}</td>
              <td className="p-2">{a.profissional_id}</td>
              <td className="p-2">{a.servico}</td>
              <td className="p-2">{a.valor}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleEdit(a)} className="btn btn-sm btn-outline">Editar</button>
                <button onClick={() => handleDelete(a.id)} className="btn btn-sm btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <AgendaModal
          data={editData}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
