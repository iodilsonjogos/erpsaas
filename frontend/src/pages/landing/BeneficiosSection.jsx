import React from "react";

const BENEFICIOS = [
  "Agenda inteligente e online",
  "Gestão completa de clientes",
  "Vendas e controle de comissão",
  "Gestão de estoque",
  "Financeiro e relatórios",
  "Permissões por perfil de acesso",
  "Multiplataforma, seguro e rápido"
];

export default function BeneficiosSection() {
  return (
    <section id="funcionalidades" className="max-w-4xl mx-auto py-14">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Funcionalidades & Benefícios</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BENEFICIOS.map((item, idx) => (
          <li key={idx} className="bg-white shadow rounded p-4 text-blue-700 flex items-center gap-2">
            <span className="text-blue-600 font-bold">✓</span> {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
