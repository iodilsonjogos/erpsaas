import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-blue-700 text-white py-20 px-4 text-center">
      <h1 className="text-4xl font-bold mb-3">O sistema de gestão inteligente para o seu negócio</h1>
      <p className="text-xl mb-6">
        Organize sua agenda, aumente vendas e fidelize clientes — tudo em uma só plataforma!
      </p>
      <a
        href="/cadastro"
        className="inline-block bg-white text-blue-700 px-8 py-3 font-bold rounded-lg shadow hover:bg-blue-100"
      >
        Testar grátis
      </a>
    </section>
  );
}
