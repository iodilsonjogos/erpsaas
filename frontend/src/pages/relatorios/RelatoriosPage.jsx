import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import RelatoriosModal from "./RelatoriosModal";
import { getRelatorios } from "./relatoriosService";

export default function RelatoriosPage() {
  const [relatorios, setRelatorios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [relatorioFiltro, setRelatorioFiltro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getRelatorios();
      setRelatorios(data);
    }
    fetchData();
  }, []);

  const colunas = [
    { key: "tipo", label: "Tipo de Relatório" },
    { key: "periodo", label: "Período" },
    { key: "criado_em", label: "Gerado em" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <a
            href={item.url}
            className="mr-2 text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Baixar
          </a>
          <button
            className="text-gray-600 hover:underline"
            onClick={() => {
              setRelatorioFiltro(item);
              setShowModal(true);
            }}
          >
            Filtros
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
            <h1 className="text-2xl font-bold">Relatórios</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => setShowModal(true)}
            >
              Gerar Relatório
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={relatorios}
            vazio="Nenhum relatório disponível."
          />
          <RelatoriosModal
            open={showModal}
            setOpen={setShowModal}
            filtro={relatorioFiltro}
          />
        </main>
      </div>
    </div>
  );
}
