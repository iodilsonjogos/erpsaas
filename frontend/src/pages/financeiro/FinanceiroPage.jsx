import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import FinanceiroModal from "./FinanceiroModal";
import { getLancamentos } from "./financeiroService";

export default function FinanceiroPage() {
  const [lancamentos, setLancamentos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [lancamentoEdit, setLancamentoEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getLancamentos();
      setLancamentos(data);
    }
    fetchData();
  }, []);

  const colunas = [
    { key: "data", label: "Data" },
    { key: "tipo", label: "Tipo" },
    { key: "descricao", label: "Descrição" },
    { key: "valor", label: "Valor" },
    { key: "categoria", label: "Categoria" },
    { key: "status", label: "Status" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setLancamentoEdit(item);
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
            <h1 className="text-2xl font-bold">Financeiro</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setLancamentoEdit(null);
                setShowModal(true);
              }}
            >
              Novo Lançamento
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={lancamentos}
            vazio="Nenhum lançamento financeiro cadastrado."
          />
          <FinanceiroModal
            open={showModal}
            setOpen={setShowModal}
            lancamento={lancamentoEdit}
          />
        </main>
      </div>
    </div>
  );
}
