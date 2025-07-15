import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import FilaEsperaModal from "./FilaEsperaModal";
import { getFilaEspera, excluirFilaEspera } from "./filaesperaService";

export default function FilaEsperaPage() {
  const [fila, setFila] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemEdit, setItemEdit] = useState(null);

  async function loadFila() {
    const data = await getFilaEspera();
    setFila(data);
  }

  useEffect(() => {
    loadFila();
  }, []);

  const colunas = [
    { key: "cliente_nome", label: "Cliente" },
    { key: "profissional_nome", label: "Profissional" },
    { key: "servico_nome", label: "Serviço" },
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
              setItemEdit(item);
              setShowModal(true);
            }}
          >
            Editar
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={async () => {
              if (window.confirm("Confirma exclusão?")) {
                await excluirFilaEspera(item.id);
                loadFila();
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
            <h1 className="text-2xl font-bold">Fila de Espera</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setItemEdit(null);
                setShowModal(true);
              }}
            >
              Novo Registro
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
            fila={itemEdit}
            onRefresh={loadFila}
          />
        </main>
      </div>
    </div>
  );
}
