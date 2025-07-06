import React from "react";

/**
 * Componente de tabela genérica, reutilizável para qualquer módulo.
 * Props:
 * - colunas: array de {key, label, render?}
 * - dados: array de objetos
 * - vazio: mensagem a exibir se a lista estiver vazia
 */
export default function TableGeneric({ colunas, dados, vazio }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {colunas.map((col, idx) => (
              <th key={idx} className="px-4 py-2 text-left">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.map((item, idx) => (
            <tr key={idx} className="border-t">
              {colunas.map((col, i) => (
                <td key={i} className="px-4 py-2">
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {dados.length === 0 && (
        <div className="p-4 text-center text-gray-400">{vazio}</div>
      )}
    </div>
  );
}
