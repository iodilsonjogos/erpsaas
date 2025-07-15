import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import VendasModal from "./VendasModal";
import { getVendas, excluirVenda } from "./vendasService";

export default function VendasPage() {
  const [vendas, setVendas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [vendaEdit, setVendaEdit] = useState(null);

  async function loadVendas() {
    const data = await getVendas();
    setVendas(data);
  }

  useEffect(() => {
    loadVendas();
  }, []);

  const colunas = [
    { key: "id", label: "ID" },
    { key: "cliente_nome", label: "Cliente" },
    { key: "valor_total", label: "Valor Total", render: (item) => "R$ " + Number(item.valor_total).toFixed(2) },
    { key: "status", label: "Status" },
    { key: "data", label: "Data", render: (item) => item.data ? item.data.split("T")[0] : "" },
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
            Editar
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={async () => {
              if (window.confirm("Confirma exclusão?")) {
                await excluirVenda(item.id);
                loadVendas();
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
            vazio="Nenhuma venda registrada."
          />
          <VendasModal
            open={showModal}
            setOpen={setShowModal}
            venda={vendaEdit}
            onRefresh={loadVendas}
          />
        </main>
      </div>
    </div>
  );
}
