import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import NotificacoesModal from "./NotificacoesModal";
import { getNotificacoes } from "./notificacoesService";

export default function NotificacoesPage() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getNotificacoes();
      setNotificacoes(data);
    }
    fetchData();
  }, []);

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
              onClick={() => setShowModal(true)}
            >
              Nova Notificação
            </button>
          </div>
          <div className="space-y-3">
            {notificacoes.length === 0 && (
              <div className="text-gray-400">Nenhuma notificação enviada ainda.</div>
            )}
            {notificacoes.map((notif, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-bold">{notif.titulo}</div>
                  <div className="text-gray-600 text-sm">{notif.mensagem}</div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <span className="text-xs text-gray-400">{notif.data}</span>
                </div>
              </div>
            ))}
          </div>
          <NotificacoesModal
            open={showModal}
            setOpen={setShowModal}
          />
        </main>
      </div>
    </div>
  );
}
