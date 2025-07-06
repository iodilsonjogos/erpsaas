import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import ComissoesModal from "./ComissoesModal";
import { getComissoes } from "./comissoesService";

export default function ComissoesPage() {
  const [comissoes, setComissoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [comissaoEdit, setComissaoEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getComissoes();
      setComissoes(data);
    }
    fetchData();
  }, []);

  const colunas = [
    { key: "profissional", label: "Profissional" },
    { key: "servico", label: "Serviço" },
    { key: "valor_servico", label: "Valor do Serviço" },
    { key: "percentual", label: "Comissão (%)" },
    { key: "valor_comissao", label: "Valor da Comissão" },
    { key: "data", label: "Data" },
    { key: "status", label: "Status" },
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
          />
        </main>
      </div>
    </div>
  );
}
