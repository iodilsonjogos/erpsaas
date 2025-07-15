import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import AutomacaoModal from "./AutomacaoModal";
import { getAutomacoes, excluirAutomacao } from "./automacaoService";

export default function AutomacaoPage() {
  const [automacoes, setAutomacoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [automacaoEdit, setAutomacaoEdit] = useState(null);

  async function loadAutomacoes() {
    const data = await getAutomacoes();
    setAutomacoes(data);
  }

  useEffect(() => {
    loadAutomacoes();
  }, []);

  const colunas = [
    { key: "nome", label: "Nome" },
    { key: "tipo", label: "Tipo" },
    { key: "destino", label: "Destino" },
    { key: "mensagem", label: "Mensagem" },
    { key: "ativo", label: "Ativo", render: (item) => item.ativo ? "Sim" : "Não" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setAutomacaoEdit(item);
              setShowModal(true);
            }}
          >
            Editar
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={async () => {
              if (window.confirm("Confirma exclusão?")) {
                await excluirAutomacao(item.id);
                loadAutomacoes();
              }
            }}
          >
            Excluir
          </button>
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
            <h1 className="text-2xl font-bold">Automação</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setAutomacaoEdit(null);
                setShowModal(true);
              }}
            >
              Nova Automação
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={automacoes}
            vazio="Nenhuma automação cadastrada."
          />
          <AutomacaoModal
            open={showModal}
            setOpen={setShowModal}
            automacao={automacaoEdit}
            onRefresh={loadAutomacoes}
          />
        </main>
      </div>
    </div>
  );
}
