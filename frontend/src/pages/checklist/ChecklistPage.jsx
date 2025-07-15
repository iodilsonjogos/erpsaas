import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import ChecklistModal from "./ChecklistModal";
import { getChecklist, excluirChecklist } from "./checklistService";

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemEdit, setItemEdit] = useState(null);

  async function loadChecklist() {
    const data = await getChecklist();
    setChecklist(data);
  }

  useEffect(() => {
    loadChecklist();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Checklist de Uso / Boas Práticas</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setItemEdit(null);
                setShowModal(true);
              }}
            >
              Novo Item
            </button>
          </div>
          <div className="space-y-3">
            {checklist.length === 0 && (
              <div className="text-gray-400">Nenhum item cadastrado ainda.</div>
            )}
            {checklist.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className={item.concluido ? "line-through text-gray-400" : ""}>
                  {item.descricao}
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setItemEdit(item);
                      setShowModal(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={async () => {
                      if (window.confirm("Confirma exclusão?")) {
                        await excluirChecklist(item.id);
                        loadChecklist();
                      }
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
          <ChecklistModal
            open={showModal}
            setOpen={setShowModal}
            item={itemEdit}
            onRefresh={loadChecklist}
          />
        </main>
      </div>
    </div>
  );
}
