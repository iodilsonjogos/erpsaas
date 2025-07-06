import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import AvaliacaoModal from "./AvaliacaoModal";
import { getAvaliacoes } from "./avaliacaoService";

export default function AvaliacaoPage() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [avaliacaoEdit, setAvaliacaoEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getAvaliacoes();
      setAvaliacoes(data);
    }
    fetchData();
  }, []);

  const colunas = [
    { key: "cliente_nome", label: "Cliente" },
    { key: "profissional", label: "Profissional" },
    { key: "servico", label: "Serviço" },
    { key: "nota", label: "Nota" },
    { key: "comentario", label: "Comentário" },
    { key: "data", label: "Data" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setAvaliacaoEdit(item);
              setShowModal(true);
            }}
          >
            Detalhes
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
            <h1 className="text-2xl font-bold">Avaliação de Clientes</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setAvaliacaoEdit(null);
                setShowModal(true);
              }}
            >
              Nova Avaliação
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={avaliacoes}
            vazio="Nenhuma avaliação registrada."
          />
          <AvaliacaoModal
            open={showModal}
            setOpen={setShowModal}
            avaliacao={avaliacaoEdit}
          />
        </main>
      </div>
    </div>
  );
}
