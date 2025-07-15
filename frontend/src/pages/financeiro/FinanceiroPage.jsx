import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import FinanceiroModal from "./FinanceiroModal";
import { getLancamentos, excluirLancamento } from "./financeiroService";

export default function FinanceiroPage() {
  const [lancamentos, setLancamentos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [lancamentoEdit, setLancamentoEdit] = useState(null);

  async function loadLancamentos() {
    const data = await getLancamentos();
    setLancamentos(data);
  }

  useEffect(() => {
    loadLancamentos();
  }, []);

  const colunas = [
    { key: "tipo", label: "Tipo" },
    { key: "categoria", label: "Categoria" },
    { key: "valor", label: "Valor", render: (item) => "R$ " + Number(item.valor).toFixed(2) },
    { key: "data", label: "Data", render: (item) => item.data ? item.data.split("T")[0] : "" },
    { key: "observacao", label: "Observação" },
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
          <button
            className="text-red-600 hover:underline"
            onClick={async () => {
              if (window.confirm("Confirma exclusão?")) {
                await excluirLancamento(item.id);
                loadLancamentos();
              }
            }}
          >
            Excluir
          </button>
        </div>
      ),
    },
  ];

  // Cálculo do saldo (apenas visual)
  const saldo =
    lancamentos.reduce(
      (total, l) => total + (l.tipo === "Receita" ? Number(l.valor) : -Number(l.valor)),
      0
    ) || 0;

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
          <div className="mb-6 bg-white p-4 rounded-lg shadow text-lg">
            <strong>Saldo Atual: </strong>
            <span className={saldo >= 0 ? "text-green-600" : "text-red-600"}>
              R$ {saldo.toFixed(2)}
            </span>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={lancamentos}
            vazio="Nenhum lançamento registrado."
          />
          <FinanceiroModal
            open={showModal}
            setOpen={setShowModal}
            lancamento={lancamentoEdit}
            onRefresh={loadLancamentos}
          />
        </main>
      </div>
    </div>
  );
}
