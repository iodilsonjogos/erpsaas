import React from "react";

export default function BannerHero({ onLead }) {
  return (
    <section className="text-center pt-16 pb-12 px-4 bg-gradient-to-br from-blue-200 to-blue-400">
      <h1 className="text-4xl font-extrabold mb-3 text-blue-900">
        O sistema mais fácil e inteligente para seu negócio de serviços!
      </h1>
      <p className="mb-5 text-xl text-blue-900">
        Agenda online, controle financeiro, relatórios e muito mais — tudo na nuvem, 100% seguro.
      </p>
      <button
        className="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold text-xl shadow-lg hover:bg-green-700"
        onClick={onLead}
      >
        Comece grátis agora!
      </button>
    </section>
  );
}
