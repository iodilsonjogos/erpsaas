import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import IntegracaoModal from "./IntegracaoModal";
import { getIntegracoes } from "./integracoesService";

export default function IntegracoesPage() {
  const [integracoes, setIntegracoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [integracaoEdit, setIntegracaoEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getIntegracoes();
      setIntegracoes(data);
    }
    fetchData();
  }, []);

  const colunas = [
    { key: "nome", label: "Integração" },
    { key: "tipo", label: "Tipo" },
    { key: "status", label: "Status", render: (item) => item.status ? "Ativa" : "Inativa" },
    { key: "conectado_com", label: "Conectado com" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setIntegracaoEdit(item);
              setShowModal(true);
            }}
          >
            Configurar
          </button>
          <button className="text-red-600 hover:underline">Desconectar</button>
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
            <h1 className="text-2xl font-bold">Integrações</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setIntegracaoEdit(null);
                setShowModal(true);
              }}
            >
              Nova Integração
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={integracoes}
            vazio="Nenhuma integração ativa."
          />
          <IntegracaoModal
            open={showModal}
            setOpen={setShowModal}
            integracao={integracaoEdit}
          />
        </main>
      </div>
    </div>
  );
}
