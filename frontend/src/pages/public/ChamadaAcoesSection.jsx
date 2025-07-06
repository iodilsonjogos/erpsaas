import React from "react";

export default function ChamadaAcoesSection() {
  return (
    <section className="bg-blue-50 py-10 px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Pronto para transformar sua gestão?</h2>
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <a href="/cadastro" className="bg-blue-700 text-white px-8 py-3 font-bold rounded-lg shadow hover:bg-blue-800">
          Testar grátis
        </a>
        <a href="/login" className="bg-white border border-blue-700 text-blue-700 px-8 py-3 font-bold rounded-lg shadow hover:bg-blue-100">
          Entrar
        </a>
        <a href="/contato" className="bg-yellow-400 text-blue-900 px-8 py-3 font-bold rounded-lg shadow hover:bg-yellow-300">
          Solicitar contato
        </a>
      </div>
    </section>
  );
}
