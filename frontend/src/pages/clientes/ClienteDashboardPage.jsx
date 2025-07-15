import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import ClienteAgendamentoModal from "./ClienteAgendamentoModal";
import { getClientes } from "./clienteService"; // CORRIGIDO!

export default function ClienteDashboardPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [agendamentoEdit, setAgendamentoEdit] = useState(null);

  async function fetchData() {
    const data = await getClientes(); // CORRIGIDO!
    setAgendamentos(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const colunas = [
    { key: "data", label: "Data" },
    { key: "hora", label: "Hora" },
    { key: "servico", label: "Serviço" },
    { key: "profissional", label: "Profissional" },
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
            Detalhes
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Meus Agendamentos</h1>
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
          vazio="Nenhum agendamento encontrado."
        />
        <ClienteAgendamentoModal
          open={showModal}
          setOpen={setShowModal}
          agendamento={agendamentoEdit}
          onRefresh={fetchData}
        />
      </main>
    </div>
  );
}
