import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import NotificacoesModal from "./NotificacoesModal";
import { getNotificacoes, excluirNotificacao } from "./notificacoesService";

export default function NotificacoesPage() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [notificacaoEdit, setNotificacaoEdit] = useState(null);

  async function loadNotificacoes() {
    const data = await getNotificacoes();
    setNotificacoes(data);
  }

  useEffect(() => {
    loadNotificacoes();
  }, []);

  const colunas = [
    { key: "tipo", label: "Tipo" },
    { key: "destino", label: "Destino" },
    { key: "titulo", label: "Título" },
    { key: "mensagem", label: "Mensagem" },
    { key: "data_envio", label: "Data de Envio", render: (item) => item.data_envio ? item.data_envio.split("T")[0] : "" },
    { key: "status", label: "Status", render: (item) => item.status ? "Enviada" : "Pendente" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setNotificacaoEdit(item);
              setShowModal(true);
            }}
          >
            Editar
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={async () => {
              if (window.confirm("Confirma exclusão?")) {
                await excluirNotificacao(item.id);
                loadNotificacoes();
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
            <h1 className="text-2xl font-bold">Notificações</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setNotificacaoEdit(null);
                setShowModal(true);
              }}
            >
              Nova Notificação
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={notificacoes}
            vazio="Nenhuma notificação cadastrada."
          />
          <NotificacoesModal
            open={showModal}
            setOpen={setShowModal}
            notificacao={notificacaoEdit}
            onRefresh={loadNotificacoes}
          />
        </main>
      </div>
    </div>
  );
}
