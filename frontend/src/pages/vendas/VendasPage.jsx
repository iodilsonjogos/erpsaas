import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import VendasModal from "./VendasModal";
import { getVendas } from "./vendasService";

export default function VendasPage() {
  const [vendas, setVendas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [vendaEdit, setVendaEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getVendas();
      setVendas(data);
    }
    fetchData();
  }, []);

  const colunas = [
    { key: "cliente_nome", label: "Cliente" },
    { key: "data", label: "Data" },
    { key: "valor_total", label: "Valor Total" },
    { key: "status", label: "Status" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setVendaEdit(item);
              setShowModal(true);
            }}
          >
            Detalhes
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
            <h1 className="text-2xl font-bold">Vendas</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setVendaEdit(null);
                setShowModal(true);
              }}
            >
              Nova Venda
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={vendas}
            vazio="Nenhuma venda cadastrada."
          />
          <VendasModal
            open={showModal}
            setOpen={setShowModal}
            venda={vendaEdit}
          />
        </main>
      </div>
    </div>
  );
}
