import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import ClientesModal from "./ClientesModal";
import { getClientes, excluirCliente } from "./clienteService";

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [clienteEdit, setClienteEdit] = useState(null);

  async function loadClientes() {
    const data = await getClientes();
    setClientes(data);
  }

  useEffect(() => {
    loadClientes();
  }, []);

  const colunas = [
    { key: "nome", label: "Nome" },
    { key: "email", label: "Email" },
    { key: "telefone", label: "Telefone" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setClienteEdit(item);
              setShowModal(true);
            }}
          >
            Editar
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={async () => {
              if (window.confirm("Confirma exclusão?")) {
                await excluirCliente(item.id);
                loadClientes();
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
            <h1 className="text-2xl font-bold">Clientes</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setClienteEdit(null);
                setShowModal(true);
              }}
            >
              Novo Cliente
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={clientes}
            vazio="Nenhum cliente cadastrado."
          />
          <ClientesModal
            open={showModal}
            setOpen={setShowModal}
            cliente={clienteEdit}
            onRefresh={loadClientes}
          />
        </main>
      </div>
    </div>
  );
}
