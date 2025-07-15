import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import PlanosModal from "./PlanosModal";
import { getPlanos, excluirPlano } from "./planosService";

export default function PlanosPage() {
  const [planos, setPlanos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [planoEdit, setPlanoEdit] = useState(null);

  async function loadPlanos() {
    const data = await getPlanos();
    setPlanos(data);
  }

  useEffect(() => {
    loadPlanos();
  }, []);

  const colunas = [
    { key: "nome", label: "Nome" },
    { key: "descricao", label: "Descrição" },
    { key: "valor", label: "Valor", render: (item) => "R$ " + Number(item.valor).toFixed(2) },
    { key: "usuarios", label: "Usuários" },
    { key: "recursos", label: "Recursos" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setPlanoEdit(item);
              setShowModal(true);
            }}
          >
            Editar
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={async () => {
              if (window.confirm("Confirma exclusão?")) {
                await excluirPlano(item.id);
                loadPlanos();
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
            <h1 className="text-2xl font-bold">Planos SaaS</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setPlanoEdit(null);
                setShowModal(true);
              }}
            >
              Novo Plano
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={planos}
            vazio="Nenhum plano cadastrado."
          />
          <PlanoModal
            open={showModal}
            setOpen={setShowModal}
            plano={planoEdit}
            onRefresh={loadPlanos}
          />
        </main>
      </div>
    </div>
  );
}
