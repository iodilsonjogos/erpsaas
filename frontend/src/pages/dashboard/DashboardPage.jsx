import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import CardIndicador from "../../components/CardIndicador";
import GraficoBarra from "../../components/GraficoBarra";
import GraficoLinha from "../../components/GraficoLinha";
import GraficoPizza from "../../components/GraficoPizza";
import DashboardModal from "./DashboardModal";

export default function DashboardPage() {
  // Exemplo de dados mockados (substitua depois por dados do backend)
  const indicadores = [
    { titulo: "Total de vendas do mês", valor: "R$ 15.420", icone: "lucide:shopping-bag", cor: "bg-blue-100" },
    { titulo: "Receitas", valor: "R$ 21.150", icone: "lucide:arrow-up-right", cor: "bg-green-100" },
    { titulo: "Despesas", valor: "R$ 8.200", icone: "lucide:arrow-down-right", cor: "bg-red-100" },
    { titulo: "Saldo atual", valor: "R$ 12.950", icone: "lucide:wallet", cor: "bg-yellow-100" },
    { titulo: "Novos clientes", valor: "23", icone: "lucide:user-plus", cor: "bg-purple-100" },
    { titulo: "Agendamentos do dia", valor: "17", icone: "lucide:calendar-days", cor: "bg-orange-100" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          {/* Indicadores principais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {indicadores.map((item, idx) => (
              <CardIndicador key={idx} {...item} />
            ))}
          </div>
          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <GraficoBarra />
            <GraficoLinha />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GraficoPizza />
            {/* Outros gráficos/relatórios */}
          </div>
          {/* Exemplo de modal de dashboard */}
          <DashboardModal />
        </main>
      </div>
    </div>
  );
}
