import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import ProfissionaisModal from "./ProfissionaisModal";
import { getProfissionais } from "./profissionaisService";

export default function ProfissionaisPage() {
  const [profissionais, setProfissionais] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [profissionalEdit, setProfissionalEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getProfissionais();
      setProfissionais(data);
    }
    fetchData();
  }, []);

  const colunas = [
    { key: "nome", label: "Nome" },
    { key: "email", label: "E-mail" },
    { key: "telefone", label: "Telefone" },
    { key: "especialidade", label: "Especialidade" },
    { key: "ativo", label: "Status", render: (item) => item.ativo ? "Ativo" : "Inativo" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setProfissionalEdit(item);
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
            <h1 className="text-2xl font-bold">Profissionais</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setProfissionalEdit(null);
                setShowModal(true);
              }}
            >
              Novo Profissional
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={profissionais}
            vazio="Nenhum profissional cadastrado."
          />
          <ProfissionaisModal
            open={showModal}
            setOpen={setShowModal}
            profissional={profissionalEdit}
          />
        </main>
      </div>
    </div>
  );
}
