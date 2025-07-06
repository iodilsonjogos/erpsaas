import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import PermissoesModal from "./PermissoesModal";
import { getPermissoes } from "./permissoesService";

export default function PermissoesPage() {
  const [permissoes, setPermissoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [permissaoEdit, setPermissaoEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getPermissoes();
      setPermissoes(data);
    }
    fetchData();
  }, []);

  const colunas = [
    { key: "perfil", label: "Perfil" },
    { key: "modulo", label: "Módulo" },
    { key: "pode_listar", label: "Listar", render: (item) => item.pode_listar ? "✔️" : "❌" },
    { key: "pode_criar", label: "Criar", render: (item) => item.pode_criar ? "✔️" : "❌" },
    { key: "pode_editar", label: "Editar", render: (item) => item.pode_editar ? "✔️" : "❌" },
    { key: "pode_excluir", label: "Excluir", render: (item) => item.pode_excluir ? "✔️" : "❌" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setPermissaoEdit(item);
              setShowModal(true);
            }}
          >
            Editar
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
            <h1 className="text-2xl font-bold">Permissões e Acesso</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setPermissaoEdit(null);
                setShowModal(true);
              }}
            >
              Nova Permissão
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={permissoes}
            vazio="Nenhuma permissão definida."
          />
          <PermissoesModal
            open={showModal}
            setOpen={setShowModal}
            permissao={permissaoEdit}
          />
        </main>
      </div>
    </div>
  );
}
