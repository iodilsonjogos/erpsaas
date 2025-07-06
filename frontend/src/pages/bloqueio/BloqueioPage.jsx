import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import BloqueioModal from "./BloqueioModal";
import { getBloqueios } from "./bloqueioService";

export default function BloqueioPage() {
  const [bloqueios, setBloqueios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bloqueioEdit, setBloqueioEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getBloqueios();
      setBloqueios(data);
    }
    fetchData();
  }, []);

  const colunas = [
    { key: "data", label: "Data" },
    { key: "hora_inicio", label: "Início" },
    { key: "hora_fim", label: "Fim" },
    { key: "profissional", label: "Profissional" },
    { key: "motivo", label: "Motivo" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setBloqueioEdit(item);
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
            <h1 className="text-2xl font-bold">Bloqueio de Horário</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setBloqueioEdit(null);
                setShowModal(true);
              }}
            >
              Novo Bloqueio
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={bloqueios}
            vazio="Nenhum bloqueio cadastrado."
          />
          <BloqueioModal
            open={showModal}
            setOpen={setShowModal}
            bloqueio={bloqueioEdit}
          />
        </main>
      </div>
    </div>
  );
}
