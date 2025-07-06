import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import OnboardingModal from "./OnboardingModal";
import { getOnboardingSteps } from "./onboardingService";

export default function OnboardingPage() {
  const [steps, setSteps] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [stepEdit, setStepEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getOnboardingSteps();
      setSteps(data);
    }
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Primeiros Passos / Ajuda</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setStepEdit(null);
                setShowModal(true);
              }}
            >
              Novo Passo / Dica
            </button>
          </div>
          <div className="space-y-3">
            {steps.length === 0 && (
              <div className="text-gray-400">Nenhuma dica ou passo cadastrados.</div>
            )}
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-bold">{step.titulo}</div>
                  <div className="text-gray-600 text-sm">{step.descricao}</div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setStepEdit(step);
                      setShowModal(true);
                    }}
                  >
                    Editar
                  </button>
                  <button className="text-red-600 hover:underline">Excluir</button>
                </div>
              </div>
            ))}
          </div>
          <OnboardingModal
            open={showModal}
            setOpen={setShowModal}
            step={stepEdit}
          />
        </main>
      </div>
    </div>
  );
}
