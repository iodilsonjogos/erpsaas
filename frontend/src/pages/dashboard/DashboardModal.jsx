import React from "react";

export default function DashboardModal({ open, setOpen, titulo, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl min-w-[340px] max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">{titulo || "Detalhes"}</h2>
          <button
            className="text-gray-500 hover:text-red-600 text-2xl font-bold"
            onClick={() => setOpen(false)}
            aria-label="Fechar"
          >
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
