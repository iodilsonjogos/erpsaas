import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import { getLogs, excluirLog } from "./logsService";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  async function loadLogs() {
    const data = await getLogs();
    setLogs(data);
  }

  useEffect(() => {
    loadLogs();
  }, []);

  const colunas = [
    { key: "data", label: "Data", render: (item) => item.data ? item.data.split("T")[0] : "" },
    { key: "hora", label: "Hora", render: (item) => item.hora || "" },
    { key: "usuario", label: "Usuário" },
    { key: "acao", label: "Ação" },
    { key: "modulo", label: "Módulo" },
    { key: "detalhes", label: "Detalhes" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <button
          className="text-red-600 hover:underline"
          onClick={async () => {
            if (window.confirm("Confirma exclusão deste log?")) {
              await excluirLog(item.id);
              loadLogs();
            }
          }}
        >
          Excluir
        </button>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">Logs de Auditoria</h1>
          <TableGeneric
            colunas={colunas}
            dados={logs}
            vazio="Nenhum log encontrado."
          />
        </main>
      </div>
    </div>
  );
}
