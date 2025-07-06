import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import FilaEsperaModal from "./FilaEsperaModal";
import { getFilaEspera } from "./filaesperaService";

export default function FilaEsperaPage() {
  const [fila, setFila] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [registroEdit, setRegistroEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getFilaEspera();
      setFila(data);
    }
    fetchData();
  }, []);

  const colunas = [
    { key: "cliente_nome", label: "Cliente" },
    { key: "data", label: "Data" },
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
              setRegistroEdit(item);
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
            <h1 className="text-2xl font-bold">Fila de Espera</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setRegistroEdit(null);
                setShowModal(true);
              }}
            >
              Novo Encaixe
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={fila}
            vazio="Nenhum cliente na fila de espera."
          />
          <FilaEsperaModal
            open={showModal}
            setOpen={setShowModal}
            registro={registroEdit}
          />
        </main>
      </div>
    </div>
  );
}
