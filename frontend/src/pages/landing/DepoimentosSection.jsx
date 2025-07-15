import React from "react";

const DEPOIMENTOS = [
  { nome: "Maria S.", texto: "Minha agenda e financeiro nunca foram tão organizados!" },
  { nome: "Pedro B.", texto: "Uso para meu estúdio de tatuagem. Rápido e prático." },
  { nome: "Amanda R.", texto: "Consigo controlar tudo, até comissão dos profissionais!" }
];

export default function DepoimentosSection() {
  return (
    <section className="bg-white py-14">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Quem usa, recomenda</h2>
      <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center">
        {DEPOIMENTOS.map((d, i) => (
          <div key={i} className="bg-blue-50 rounded-xl p-6 w-80 shadow border border-blue-100">
            <p className="mb-2">“{d.texto}”</p>
            <span className="font-bold text-blue-700">{d.nome}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
