import React, { useState } from "react";
// Exemplo: import { enviarLead } from "./landingService";
import LandingModal from "./LandingModal";

const SEGMENTOS = [
  "Beleza & Estética",
  "Salão/Barbearia",
  "Clínica de Estética",
  "Personal/Academia",
  "Terapias",
  "Pet Shop",
  "Consultorias",
  "Coworking",
  "Oficina"
];

const FUNCIONALIDADES = [
  "Agenda inteligente",
  "Gestão de clientes",
  "Vendas e comissões",
  "Controle financeiro",
  "Gestão de estoque",
  "Relatórios em PDF/Excel",
  "Controle de permissões (ACL)",
  "Multiplataforma"
];

const DEPOIMENTOS = [
  { nome: "Maria S.", texto: "Minha agenda e financeiro nunca foram tão organizados!" },
  { nome: "Pedro B.", texto: "Uso para meu estúdio de tatuagem. Rápido e prático." },
  { nome: "Amanda R.", texto: "Consigo controlar tudo, até comissão dos profissionais!" }
];

export default function LandingPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Topo fixo */}
      <header className="bg-white/80 sticky top-0 z-40 shadow p-4 flex justify-between items-center">
        <div className="text-2xl font-extrabold text-blue-700">SeuSistema</div>
        <nav className="flex gap-4">
          <a href="#funcionalidades" className="hover:underline">Funcionalidades</a>
          <a href="#segmentos" className="hover:underline">Segmentos</a>
          <a href="#contato" className="hover:underline">Contato</a>
          <button className="bg-blue-700 text-white px-4 py-2 rounded font-bold shadow hover:bg-blue-800" onClick={() => setShowModal(true)}>
            Testar Grátis
          </button>
          <a href="/login" className="bg-white text-blue-700 border border-blue-700 px-4 py-2 rounded font-bold shadow hover:bg-blue-50 ml-2">
            Entrar
          </a>
        </nav>
      </header>

      {/* Banner/Chamada principal */}
      <section className="text-center pt-16 pb-12 px-4 bg-gradient-to-br from-blue-200 to-blue-400">
        <h1 className="text-4xl font-extrabold mb-3 text-blue-900">O sistema mais fácil e inteligente para seu negócio de serviços!</h1>
        <p className="mb-5 text-xl text-blue-900">
          Agenda online, controle financeiro, relatórios e muito mais — tudo na nuvem, 100% seguro.
        </p>
        <button className="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold text-xl shadow-lg hover:bg-green-700" onClick={() => setShowModal(true)}>
          Comece grátis agora!
        </button>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="max-w-4xl mx-auto py-14">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Funcionalidades</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FUNCIONALIDADES.map((item, idx) => (
            <li key={idx} className="bg-white shadow rounded p-4 text-blue-700 flex items-center gap-2">
              <span className="text-blue-600 font-bold">✓</span> {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Segmentos */}
      <section id="segmentos" className="max-w-4xl mx-auto py-14">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Segmentos Atendidos</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {SEGMENTOS.map((item, idx) => (
            <div key={idx} className="bg-blue-200 text-blue-900 rounded-full px-4 py-2 shadow">{item}</div>
          ))}
        </div>
      </section>

      {/* Depoimentos/Cases */}
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

      {/* Call to Action final */}
      <section className="bg-blue-700 text-white text-center py-10">
        <h2 className="text-2xl font-bold mb-2">Faça parte de quem já vende e agenda mais fácil</h2>
        <button className="bg-white text-blue-700 font-bold px-8 py-3 rounded-2xl shadow hover:bg-blue-50 text-xl" onClick={() => setShowModal(true)}>
          Quero testar grátis
        </button>
      </section>

      {/* Rodapé */}
      <footer id="contato" className="bg-blue-900 text-white py-8 text-center">
        <div>
          &copy; {new Date().getFullYear()} SeuSistema. Todos os direitos reservados.
        </div>
        <div className="mt-2">Dúvidas? <a href="mailto:contato@seusistema.com" className="underline">contato@seusistema.com</a></div>
      </footer>

      {/* Modal para Testar Grátis */}
      <LandingModal open={showModal} setOpen={setShowModal} />
    </div>
  );
}
