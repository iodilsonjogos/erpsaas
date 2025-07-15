import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import MarketingModal from "./MarketingModal";
import { getCampanhas, excluirCampanha } from "./marketingService";

export default function MarketingPage() {
  const [campanhas, setCampanhas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [campanhaEdit, setCampanhaEdit] = useState(null);

  async function loadCampanhas() {
    const data = await getCampanhas();
    setCampanhas(data);
  }

  useEffect(() => {
    loadCampanhas();
  }, []);

  const colunas = [
    { key: "titulo", label: "Título" },
    { key: "tipo", label: "Tipo" },
    { key: "publico", label: "Público Alvo" },
    { key: "data_envio", label: "Envio", render: (item) => item.data_envio ? item.data_envio.split("T")[0] : "" },
    { key: "status", label: "Status" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setCampanhaEdit(item);
              setShowModal(true);
            }}
          >
            Editar
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={async () => {
              if (window.confirm("Confirma exclusão?")) {
                await excluirCampanha(item.id);
                loadCampanhas();
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
            <h1 className="text-2xl font-bold">Campanhas de Marketing</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setCampanhaEdit(null);
                setShowModal(true);
              }}
            >
              Nova Campanha
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={campanhas}
            vazio="Nenhuma campanha registrada."
          />
          <MarketingModal
            open={showModal}
            setOpen={setShowModal}
            campanha={campanhaEdit}
            onRefresh={loadCampanhas}
          />
        </main>
      </div>
    </div>
  );
}
