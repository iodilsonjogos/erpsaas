import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { exportarRelatorio } from "./relatoriosService";

const MODULOS = [
  { key: "vendas", label: "Vendas" },
  { key: "clientes", label: "Clientes" },
  { key: "produtos", label: "Produtos" },
  { key: "agenda", label: "Agenda" },
  { key: "financeiro", label: "Financeiro" }
];

export default function RelatoriosPage() {
  const [modulo, setModulo] = useState("vendas");
  const [formato, setFormato] = useState("excel");
  const [dataIni, setDataIni] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleExportar(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await exportarRelatorio(modulo, formato, { data_ini: dataIni, data_fim: dataFim });
    } catch {
      alert("Erro ao exportar relatório.");
    }
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-8">Relatórios</h1>
          <form className="bg-white p-8 rounded-xl shadow-xl" onSubmit={handleExportar}>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Módulo</label>
              <select className="w-full border rounded p-2" value={modulo} onChange={e => setModulo(e.target.value)}>
                {MODULOS.map((m) => (
                  <option key={m.key} value={m.key}>{m.label}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Formato</label>
              <select className="w-full border rounded p-2" value={formato} onChange={e => setFormato(e.target.value)}>
                <option value="excel">Excel (.xlsx)</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
            <div className="mb-4 flex gap-4">
              <div>
                <label className="block mb-1">Data Inicial</label>
                <input type="date" className="border rounded p-2" value={dataIni} onChange={e => setDataIni(e.target.value)} />
              </div>
              <div>
                <label className="block mb-1">Data Final</label>
                <input type="date" className="border rounded p-2" value={dataFim} onChange={e => setDataFim(e.target.value)} />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white font-bold py-3 rounded mt-4"
              disabled={loading}
            >
              {loading ? "Exportando..." : "Exportar"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
