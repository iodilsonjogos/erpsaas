import React from "react";

export default function CasesSection() {
  // Exemplos fictícios; substitua por cases reais
  const cases = [
    {
      nome: "Studio Bella",
      depoimento: "O sistema otimizou nossa rotina, aumentou a ocupação e reduziu faltas em 30%.",
    },
    {
      nome: "Clínica Saúde Total",
      depoimento: "Relatórios precisos, suporte rápido e integração com WhatsApp fazem toda a diferença!",
    },
    {
      nome: "PetShop Amigo",
      depoimento: "Agora temos controle total dos agendamentos e comissões dos profissionais.",
    },
  ];

  return (
    <section className="bg-white py-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Clientes Satisfeitos</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {cases.map((item, idx) => (
          <div key={idx} className="bg-gray-100 rounded-xl p-6 text-center shadow">
            <div className="font-bold text-lg mb-2">{item.nome}</div>
            <div className="italic text-gray-700">"{item.depoimento}"</div>
          </div>
        ))}
      </div>
    </section>
  );
}
