import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import OnboardingModal from "./OnboardingModal";
import { getEtapasOnboarding, excluirEtapaOnboarding } from "./onboardingService";

export default function OnboardingPage() {
  const [etapas, setEtapas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [etapaEdit, setEtapaEdit] = useState(null);

  async function loadEtapas() {
    const data = await getEtapasOnboarding();
    setEtapas(data);
  }

  useEffect(() => {
    loadEtapas();
  }, []);

  const colunas = [
    { key: "ordem", label: "Ordem" },
    { key: "titulo", label: "Título" },
    { key: "descricao", label: "Descrição" },
    { key: "completa", label: "Completa", render: (item) => item.completa ? "Sim" : "Não" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setEtapaEdit(item);
              setShowModal(true);
            }}
          >
            Editar
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={async () => {
              if (window.confirm("Confirma exclusão?")) {
                await excluirEtapaOnboarding(item.id);
                loadEtapas();
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
            <h1 className="text-2xl font-bold">Onboarding (Boas-vindas)</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setEtapaEdit(null);
                setShowModal(true);
              }}
            >
              Nova Etapa
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={etapas}
            vazio="Nenhuma etapa cadastrada."
          />
          <OnboardingModal
            open={showModal}
            setOpen={setShowModal}
            etapa={etapaEdit}
            onRefresh={loadEtapas}
          />
        </main>
      </div>
    </div>
  );
}
