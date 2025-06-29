import React, { useEffect, useState } from 'react';
import { listarProfissionais, criarProfissional, atualizarProfissional, removerProfissional } from './profissionalService';
import ProfissionalModal from './ProfissionalModal';

export default function ProfissionaisPage() {
  const [profissionais, setProfissionais] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    const { data } = await listarProfissionais();
    setProfissionais(data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (data) => {
    if (data.id) await atualizarProfissional(data.id, data);
    else await criarProfissional(data);
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
      await removerProfissional(id);
      fetchData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Profissionais</h2>
      <button className="btn btn-primary mb-2" onClick={() => { setEditData(null); setModalOpen(true); }}>
        Novo Profissional
      </button>
      <table className="min-w-full bg-white rounded-xl shadow">
        <thead>
          <tr>
            <th className="p-2">Nome</th>
            <th className="p-2">Especialidade</th>
            <th className="p-2">Ativo</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {profissionais.map((p) => (
            <tr key={p.id}>
              <td className="p-2">{p.nome}</td>
              <td className="p-2">{p.especialidade}</td>
              <td className="p-2">{p.ativo ? "Sim" : "Não"}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleEdit(p)} className="btn btn-sm btn-outline">Editar</button>
                <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <ProfissionalModal
          data={editData}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
