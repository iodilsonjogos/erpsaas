import React, { useEffect, useState } from 'react';
import { listarProdutos, criarProduto, atualizarProduto, removerProduto } from './produtoService';
import ProdutoModal from './ProdutoModal';

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchData = async () => {
    const { data } = await listarProdutos();
    setProdutos(data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (data) => {
    if (data.id) await atualizarProduto(data.id, data);
    else await criarProduto(data);
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
      await removerProduto(id);
      fetchData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Produtos</h2>
      <button className="btn btn-primary mb-2" onClick={() => { setEditData(null); setModalOpen(true); }}>
        Novo Produto
      </button>
      <table className="min-w-full bg-white rounded-xl shadow">
        <thead>
          <tr>
            <th className="p-2">Nome</th>
            <th className="p-2">Categoria</th>
            <th className="p-2">Unidade</th>
            <th className="p-2">Preço Custo</th>
            <th className="p-2">Preço Venda</th>
            <th className="p-2">Estoque</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id}>
              <td className="p-2">{p.nome}</td>
              <td className="p-2">{p.categoria}</td>
              <td className="p-2">{p.unidade}</td>
              <td className="p-2">R$ {p.preco_custo}</td>
              <td className="p-2">R$ {p.preco_venda}</td>
              <td className="p-2">{p.estoque}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => handleEdit(p)} className="btn btn-sm btn-outline">Editar</button>
                <button onClick={() => handleDelete(p.id)} className="btn btn-sm btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <ProdutoModal
          data={editData}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
