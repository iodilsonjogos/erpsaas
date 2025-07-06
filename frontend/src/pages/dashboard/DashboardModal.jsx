import React, { useState } from "react";

/**
 * Exemplo de modal que pode ser usado para detalhes do dashboard,
 * filtros, configurações rápidas, etc.
 */
export default function DashboardModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="mt-8 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        Abrir Modal de Exemplo
      </button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg min-w-[320px]">
            <h2 className="text-lg font-bold mb-3">Exemplo de Modal</h2>
            <p>Este é um modal de demonstração. Use para mostrar detalhes, filtros, etc.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setOpen(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
