import React, { useEffect, useState } from 'react';
import { listarLancamentos, criarLancamento, atualizarLancamento, removerLancamento } from './financeiroService';
import FinanceiroModal from './FinanceiroModal';

export default function FinanceiroPage() {
  const [lancamentos, setLancamentos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    const { data } = await listarLancamentos();
    setLancamentos(data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (data) => {
    if (data.id) await atualizarLancamento(data.id, data);
    else await criarLancamento(data);
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
      await removerLancamento(id);
      fetchData();
    }
  };

  // Cálculo de saldo
  const saldo = lancamentos.reduce((acc, l) =>
    l.tipo === 'entrada' ? acc + Number(l.valor) : acc - Number(l.valor), 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Financeiro (Fluxo de Caixa)</h2>
      <div className="mb-4 font-bold text-lg">
        Saldo Atual: <span className={saldo >= 0 ? 'text-green-600' : 'text-red-600'}>R$ {saldo.toFixed(2)}</span>
      </div>
      <button className="btn btn-primary mb-2" onClick={() => { setEditData(null); setModalOpen(true); }}>
        Novo Lançamento
      </button>
      <table className="min-w-full bg-white rounded-xl shadow">
        <thead>
          <tr>
            <th className="p-2">Data</th>
            <th className="p-2">Tipo</th>
            <th className="p-2">Descrição</th>
            <th className="p-2">Categoria</th>
            <th className="p-2">Valor</th>
            <th className="p-2">Forma Pgto</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {lancamentos.map((l) => (
            <tr key={l.id}>
              <td className="p-2">{l.data}</td>
              <td className={`p-2 ${l.tipo === 'entrada' ? 'text-green-600' : 'text-red-600'}`}>{l.tipo}</td>
              <td className="p-2">{l.descricao}</td>
              <td className="p-2">{l.categoria}</td>
              <td className="p-2">R$ {l.valor}</td>
              <td className="p-2">{l.forma_pagamento}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleEdit(l)} className="btn btn-sm btn-outline">Editar</button>
                <button onClick={() => handleDelete(l.id)} className="btn btn-sm btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <FinanceiroModal
          data={editData}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
