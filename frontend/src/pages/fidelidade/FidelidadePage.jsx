import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import FidelidadeModal from "./FidelidadeModal";
import { getFidelidades, excluirFidelidade } from "./fidelidadeService";

export default function FidelidadePage() {
  const [fidelidades, setFidelidades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fidelidadeEdit, setFidelidadeEdit] = useState(null);

  async function loadFidelidades() {
    const data = await getFidelidades();
    setFidelidades(data);
  }

  useEffect(() => {
    loadFidelidades();
  }, []);

  const colunas = [
    { key: "cliente_nome", label: "Cliente" },
    { key: "pontos", label: "Pontos" },
    { key: "resgatado", label: "Resgatado", render: (item) => item.resgatado ? "Sim" : "Não" },
    { key: "descricao", label: "Descrição" },
    { key: "data", label: "Data", render: (item) => item.data ? item.data.split("T")[0] : "" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setFidelidadeEdit(item);
              setShowModal(true);
            }}
          >
            Editar
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={async () => {
              if (window.confirm("Confirma exclusão?")) {
                await excluirFidelidade(item.id);
                loadFidelidades();
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
            <h1 className="text-2xl font-bold">Programa de Fidelidade</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setFidelidadeEdit(null);
                setShowModal(true);
              }}
            >
              Novo Registro
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={fidelidades}
            vazio="Nenhum registro de fidelidade."
          />
          <FidelidadeModal
            open={showModal}
            setOpen={setShowModal}
            fidelidade={fidelidadeEdit}
            onRefresh={loadFidelidades}
          />
        </main>
      </div>
    </div>
  );
}
