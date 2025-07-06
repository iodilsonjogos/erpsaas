import React from "react";

export default function PromocaoSection() {
  return (
    <section className="bg-yellow-100 py-10 px-4 text-center">
      <h2 className="text-2xl font-bold mb-3">Promoção Especial de Lançamento!</h2>
      <p className="mb-4">Ganhe 30 dias grátis e condições exclusivas para os primeiros assinantes.</p>
      <a
        href="/cadastro"
        className="bg-blue-700 text-white px-8 py-3 font-bold rounded-lg shadow hover:bg-blue-800"
      >
        Quero aproveitar
      </a>
    </section>
  );
}
