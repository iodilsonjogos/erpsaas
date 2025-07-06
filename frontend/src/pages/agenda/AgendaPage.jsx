import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import AgendaModal from "./AgendaModal";
import { getAgendamentos } from "./agendaService";

export default function AgendaPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [agendamentoEdit, setAgendamentoEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getAgendamentos();
      setAgendamentos(data);
    }
    fetchData();
  }, []);

  const colunas = [
    { key: "cliente_nome", label: "Cliente" },
    { key: "profissional_nome", label: "Profissional" },
    { key: "servico_nome", label: "Serviço" },
    { key: "data", label: "Data" },
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
              setAgendamentoEdit(item);
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
            <h1 className="text-2xl font-bold">Agenda</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setAgendamentoEdit(null);
                setShowModal(true);
              }}
            >
              Novo Agendamento
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={agendamentos}
            vazio="Nenhum agendamento cadastrado."
          />
          <AgendaModal
            open={showModal}
            setOpen={setShowModal}
            agendamento={agendamentoEdit}
          />
        </main>
      </div>
    </div>
  );
}
