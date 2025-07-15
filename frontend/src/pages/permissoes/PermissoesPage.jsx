import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import PermissoesModal from "./PermissoesModal";
import { getPerfis, getPermissoes, atualizarPermissoes } from "./permissoesService";

export default function PermissoesPage() {
  const [perfis, setPerfis] = useState([]);
  const [permissoes, setPermissoes] = useState([]);
  const [perfilSelecionado, setPerfilSelecionado] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setPerfis(await getPerfis());
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchPerms() {
      if (perfilSelecionado) setPermissoes(await getPermissoes(perfilSelecionado));
    }
    fetchPerms();
  }, [perfilSelecionado]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">Permissões de Usuário (ACL)</h1>
          <div className="mb-6">
            <label>Selecione o perfil:</label>
            <select
              className="border rounded p-2 ml-2"
              value={perfilSelecionado || ""}
              onChange={e => setPerfilSelecionado(e.target.value)}
            >
              <option value="">-- Selecione --</option>
              {perfis.map((perfil, idx) => (
                <option key={idx} value={perfil}>{perfil}</option>
              ))}
            </select>
          </div>
          {perfilSelecionado && (
            <div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 mb-4"
                onClick={() => setShowModal(true)}
              >
                Editar Permissões
              </button>
              <PermissaoModal
                open={showModal}
                setOpen={setShowModal}
                perfil={perfilSelecionado}
                permissoes={permissoes}
                onSave={async (novasPerms) => {
                  await atualizarPermissoes(perfilSelecionado, novasPerms);
                  setShowModal(false);
                  setPermissoes(novasPerms);
                }}
              />
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-bold mb-2">Permissões atuais:</h2>
                <ul className="space-y-1">
                  {Object.entries(permissoes || {}).map(([modulo, acao]) =>
                    <li key={modulo}>
                      <span className="font-bold">{modulo}:</span>{" "}
                      {Array.isArray(acao) ? acao.join(", ") : JSON.stringify(acao)}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
