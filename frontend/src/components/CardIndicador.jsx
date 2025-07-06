import React from "react";

export default function CardIndicador({ titulo, valor, icone, cor }) {
  return (
    <div className={`rounded-xl shadow p-4 flex flex-col items-center bg-white`}>
      <div className={`rounded-full p-3 mb-2 ${cor}`}>
        <span>{icone}</span>
      </div>
      <span className="text-2xl font-bold">{valor}</span>
      <span className="text-sm text-gray-600 text-center">{titulo}</span>
    </div>
  );
}
