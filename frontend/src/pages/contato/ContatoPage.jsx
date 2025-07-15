import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import ContatoModal from "./ContatoModal";
import { getContatos, excluirContato } from "./contatoService";

export default function ContatoPage() {
  const [contatos, setContatos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [contatoEdit, setContatoEdit] = useState(null);

  async function loadContatos() {
    const data = await getContatos();
    setContatos(data);
  }

  useEffect(() => {
    loadContatos();
  }, []);

  const colunas = [
    { key: "nome", label: "Nome" },
    { key: "email", label: "Email" },
    { key: "assunto", label: "Assunto" },
    { key: "mensagem", label: "Mensagem" },
    { key: "data", label: "Data", render: (item) => item.data ? item.data.split("T")[0] : "" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setContatoEdit(item);
              setShowModal(true);
            }}
          >
            Responder
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={async () => {
              if (window.confirm("Confirma exclusão?")) {
                await excluirContato(item.id);
                loadContatos();
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
            <h1 className="text-2xl font-bold">Contato/Suporte</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setContatoEdit(null);
                setShowModal(true);
              }}
            >
              Novo Contato
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={contatos}
            vazio="Nenhuma mensagem registrada."
          />
          <ContatoModal
            open={showModal}
            setOpen={setShowModal}
            contato={contatoEdit}
            onRefresh={loadContatos}
          />
        </main>
      </div>
    </div>
  );
}
