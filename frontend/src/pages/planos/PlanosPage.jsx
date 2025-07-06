import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import PlanosModal from "./PlanosModal";
import { getPlanos } from "./planosService";

export default function PlanosPage() {
  const [planos, setPlanos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [planoEdit, setPlanoEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getPlanos();
      setPlanos(data);
    }
    fetchData();
  }, []);

  const colunas = [
    { key: "nome", label: "Nome do Plano" },
    { key: "descricao", label: "Descrição" },
    { key: "valor", label: "Valor Mensal" },
    { key: "limite_clientes", label: "Limite Clientes" },
    { key: "limite_profissionais", label: "Limite Profissionais" },
    { key: "limite_usuarios", label: "Limite Usuários" },
    { key: "status", label: "Status", render: (item) => item.status === "ativo" ? "Ativo" : "Inativo" },
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
          <PlanosModal
            open={showModal}
            setOpen={setShowModal}
            plano={planoEdit}
          />
        </main>
      </div>
    </div>
  );
}
