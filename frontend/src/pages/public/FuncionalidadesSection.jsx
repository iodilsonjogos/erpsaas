import React from "react";

export default function FuncionalidadesSection() {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Funcionalidades</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-2">Agenda Inteligente</h3>
          <p>Visualize e organize agendamentos com bloqueios, encaixes e notificações automáticas.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-2">Gestão Financeira</h3>
          <p>Controle receitas, despesas, fluxo de caixa, comissões e relatórios exportáveis.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-2">Marketing & Fidelidade</h3>
          <p>Automatize mensagens, promoções, pesquisas e programas de pontos para fidelizar clientes.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-2">Gestão Multiempresa</h3>
          <p>Tenha controle total por filial, planos flexíveis e permissões por perfil de usuário.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-2">Integrações</h3>
          <p>Conecte WhatsApp, e-mail, pagamentos online e API pública facilmente.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-2">Relatórios Profissionais</h3>
          <p>Visualize gráficos, exporte relatórios e acompanhe indicadores em tempo real.</p>
        </div>
      </div>
    </section>
  );
}
