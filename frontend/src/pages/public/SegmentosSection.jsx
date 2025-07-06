import React from "react";

export default function SegmentosSection() {
  const segmentos = [
    "Salão de Beleza",
    "Barbearia",
    "Clínica de Estética",
    "Terapias",
    "Petshop",
    "Academias",
    "Coworking",
    "Consultórios",
    "Oficinas",
    "Profissionais Autônomos",
  ];

  return (
    <section className="bg-gray-50 py-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Segmentos Atendidos</h2>
      <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {segmentos.map((seg, idx) => (
          <div key={idx} className="bg-white rounded shadow px-4 py-2 text-center">{seg}</div>
        ))}
      </div>
    </section>
  );
}
