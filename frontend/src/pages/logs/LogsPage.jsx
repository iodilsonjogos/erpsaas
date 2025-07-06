import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import { getLogs } from "./logsService";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getLogs();
      setLogs(data);
    }
    fetchData();
  }, []);

  const colunas = [
    { key: "usuario", label: "Usuário" },
    { key: "acao", label: "Ação" },
    { key: "modulo", label: "Módulo" },
    { key: "data", label: "Data" },
    { key: "detalhes", label: "Detalhes" },
    { key: "ip", label: "IP" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">Logs de Ação/Sistema</h1>
          <TableGeneric
            colunas={colunas}
            dados={logs}
            vazio="Nenhum log registrado ainda."
          />
        </main>
      </div>
    </div>
  );
}
