import React, { useEffect, useState } from 'react';
import { listarServicos, criarServico, atualizarServico, removerServico } from './servicoService';
import ServicoModal from './ServicoModal';

export default function ServicosPage() {
  const [servicos, setServicos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    const { data } = await listarServicos();
    setServicos(data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (data) => {
    if (data.id) await atualizarServico(data.id, data);
    else await criarServico(data);
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
      await removerServico(id);
      fetchData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Serviços</h2>
      <button className="btn btn-primary mb-2" onClick={() => { setEditData(null); setModalOpen(true); }}>
        Novo Serviço
      </button>
      <table className="min-w-full bg-white rounded-xl shadow">
        <thead>
          <tr>
            <th className="p-2">Nome</th>
            <th className="p-2">Preço</th>
            <th className="p-2">Duração (min)</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map((s) => (
            <tr key={s.id}>
              <td className="p-2">{s.nome}</td>
              <td className="p-2">R$ {s.preco}</td>
              <td className="p-2">{s.duracao_minutos}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleEdit(s)} className="btn btn-sm btn-outline">Editar</button>
                <button onClick={() => handleDelete(s.id)} className="btn btn-sm btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <ServicoModal
          data={editData}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
