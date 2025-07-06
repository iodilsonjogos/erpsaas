import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import ProdutosModal from "./ProdutosModal";
import { getProdutos } from "./produtosService";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [produtoEdit, setProdutoEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getProdutos();
      setProdutos(data);
    }
    fetchData();
  }, []);

  const colunas = [
    { key: "nome", label: "Nome" },
    { key: "categoria", label: "Categoria" },
    { key: "preco", label: "Preço" },
    { key: "estoque", label: "Estoque" },
    { key: "ativo", label: "Status", render: (item) => item.ativo ? "Ativo" : "Inativo" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setProdutoEdit(item);
              setShowModal(true);
            }}
          >
            Editar
          </button>
          <button className="text-red-600 hover:underline">Excluir</button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Produtos</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setProdutoEdit(null);
                setShowModal(true);
              }}
            >
              Novo Produto
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={produtos}
            vazio="Nenhum produto cadastrado."
          />
          <ProdutosModal
            open={showModal}
            setOpen={setShowModal}
            produto={produtoEdit}
          />
        </main>
      </div>
    </div>
  );
}
