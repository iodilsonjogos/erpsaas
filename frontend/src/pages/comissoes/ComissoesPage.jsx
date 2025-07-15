import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import ComissoesModal from "./ComissoesModal";
import { getComissoes, excluirComissao } from "./comissoesService";

export default function ComissoesPage() {
  const [comissoes, setComissoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [comissaoEdit, setComissaoEdit] = useState(null);

  async function loadComissoes() {
    const data = await getComissoes();
    setComissoes(data);
  }

  useEffect(() => {
    loadComissoes();
  }, []);

  const colunas = [
    { key: "profissional_nome", label: "Profissional" },
    { key: "servico_nome", label: "Serviço" },
    { key: "venda_id", label: "Venda" },
    { key: "valor_comissao", label: "Valor Comissão", render: (item) => `R$ ${item.valor_comissao}` },
    { key: "data", label: "Data", render: (item) => item.data ? item.data.split("T")[0] : "" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setComissaoEdit(item);
              setShowModal(true);
            }}
          >
            Editar
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={async () => {
              if (window.confirm("Confirma exclusão?")) {
                await excluirComissao(item.id);
                loadComissoes();
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
            <h1 className="text-2xl font-bold">Comissões</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setComissaoEdit(null);
                setShowModal(true);
              }}
            >
              Nova Comissão
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={comissoes}
            vazio="Nenhuma comissão registrada."
          />
          <ComissoesModal
            open={showModal}
            setOpen={setShowModal}
            comissao={comissaoEdit}
            onRefresh={loadComissoes}
          />
        </main>
      </div>
    </div>
  );
}
