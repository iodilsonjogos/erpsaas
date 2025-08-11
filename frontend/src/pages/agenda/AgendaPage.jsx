import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import AgendaModal from "./AgendaModal";
import { getAgendamentos, excluirAgendamento } from "./agendaService";

export default function AgendaPage() {
  const [agendas, setAgendas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [agendaEdit, setAgendaEdit] = useState(null);

  async function loadAgendas() {
    const data = await getAgendamentos();
    setAgendas(data);
  }

  useEffect(() => {
    loadAgendas();
  }, []);

  const colunas = [
    { key: "cliente", label: "Cliente" },
    { key: "profissional", label: "Profissional" },
    { key: "servico", label: "Serviço" },
    { key: "data", label: "Data", render: (item) => item.data ? item.data.split("T")[0] : "" },
    { key: "hora", label: "Hora" },
    { key: "status", label: "Status" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setAgendaEdit(item);
              setShowModal(true);
            }}
          >
            Editar
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={async () => {
              if (window.confirm("Confirma exclusão?")) {
                await excluirAgendamento(item.id);
                loadAgendas();
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
            <h1 className="text-2xl font-bold">Agenda</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setAgendaEdit(null);
                setShowModal(true);
              }}
            >
              Novo Agendamento
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={agendas}
            vazio="Nenhum agendamento encontrado."
          />
          <AgendaModal
            open={showModal}
            setOpen={setShowModal}
            agendamento={agendaEdit}
            onRefresh={loadAgendas}
          />
        </main>
      </div>
    </div>
  );
}
