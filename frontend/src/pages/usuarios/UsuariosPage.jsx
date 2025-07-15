import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TableGeneric from "../../components/TableGeneric";
import UsuariosModal from "./UsuariosModal";
import { getUsuarios, excluirUsuario } from "./usuariosService";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);

  async function loadUsuarios() {
    const data = await getUsuarios();
    setUsuarios(data);
  }

  useEffect(() => {
    loadUsuarios();
  }, []);

  const colunas = [
    { key: "nome", label: "Nome" },
    { key: "email", label: "Email" },
    { key: "perfil", label: "Perfil" },
    { key: "status", label: "Status", render: (item) => item.status ? "Ativo" : "Inativo" },
    {
      key: "acoes",
      label: "Ações",
      render: (item) => (
        <div>
          <button
            className="mr-2 text-blue-600 hover:underline"
            onClick={() => {
              setUsuarioEdit(item);
              setShowModal(true);
            }}
          >
            Editar
          </button>
          <button
            className="text-red-600 hover:underline"
            onClick={async () => {
              if (window.confirm("Confirma exclusão?")) {
                await excluirUsuario(item.id);
                loadUsuarios();
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
            <h1 className="text-2xl font-bold">Usuários</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setUsuarioEdit(null);
                setShowModal(true);
              }}
            >
              Novo Usuário
            </button>
          </div>
          <TableGeneric
            colunas={colunas}
            dados={usuarios}
            vazio="Nenhum usuário cadastrado."
          />
          <UsuariosModal
            open={showModal}
            setOpen={setShowModal}
            usuario={usuarioEdit}
            onRefresh={loadUsuarios}
          />
        </main>
      </div>
    </div>
  );
}
