import React from "react";
export default function HomeModal({ open, setOpen }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]">
        <h2 className="text-lg font-bold mb-3">Avisos e Mensagens</h2>
        <p>Nenhum aviso pendente.</p>
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setOpen(false)}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
