import React, { useEffect, useState } from "react";
import { getDashboardResumo, getVendasMes, getProdutosTop } from "./dashboardservice";
import DashboardModal from "./DashboardModal";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e42", "#e11d48", "#a21caf"];

export default function DashboardPage() {
  const [resumo, setResumo] = useState({});
  const [vendasMes, setVendasMes] = useState([]);
  const [produtosTop, setProdutosTop] = useState([]);

  // Modal de detalhes
  const [showModal, setShowModal] = useState(false);
  const [modalTitulo, setModalTitulo] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setResumo(await getDashboardResumo());
      setVendasMes(await getVendasMes());
      setProdutosTop(await getProdutosTop());
    }
    fetchData();
  }, []);

  // Exemplo de conteúdo detalhado de vendas
  function detalharVendas() {
    setModalTitulo("Detalhes de Vendas");
    setModalContent(
      <div>
        <h3 className="font-bold mb-2">Total de vendas: {resumo.total_vendas}</h3>
        <div className="mb-2">Últimas vendas por mês:</div>
        <ResponsiveContainer width={280} height={180}>
          <BarChart data={vendasMes}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
    setShowModal(true);
  }

  // Exemplo de conteúdo detalhado de saldo
  function detalharSaldo() {
    setModalTitulo("Saldo Financeiro Detalhado");
    setModalContent(
      <div>
        <h3 className="font-bold mb-2">Saldo atual: R$ {resumo.saldo_financeiro}</h3>
        <div>Inclui recebíveis e despesas do mês corrente.</div>
        {/* Adicione outros detalhes financeiros aqui */}
      </div>
    );
    setShowModal(true);
  }

  return (
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          {/* Cards principais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ResumoCard
              label="Total de Vendas"
              valor={resumo.total_vendas || 0}
              onDetalhes={detalharVendas}
            />
            <ResumoCard
              label="Novos Clientes"
              valor={resumo.novos_clientes || 0}
            />
            <ResumoCard
              label="Agendamentos Hoje"
              valor={resumo.agenda_hoje || 0}
            />
            <ResumoCard
              label="Saldo Financeiro"
              valor={"R$ " + (resumo.saldo_financeiro || "0,00")}
              onDetalhes={detalharSaldo}
            />
          </div>
          {/* Gráficos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-bold mb-4">Vendas por mês</h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={vendasMes}>
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-lg font-bold mb-4">Produtos mais vendidos</h2>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={produtosTop}
                    dataKey="quantidade"
                    nameKey="produto"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {produtosTop.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DashboardModal open={showModal} setOpen={setShowModal} titulo={modalTitulo}>
            {modalContent}
          </DashboardModal>
        </main>

  );
}

// Card com botão de detalhes
function ResumoCard({ label, valor, onDetalhes }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center relative group">
      <div className="text-3xl font-bold">{valor}</div>
      <div className="text-sm mt-2 text-gray-500">{label}</div>
      {onDetalhes && (
        <button
          className="absolute right-3 top-3 text-blue-600 opacity-0 group-hover:opacity-100 transition"
          onClick={onDetalhes}
          title="Ver detalhes"
        >
          <span className="underline">Detalhes</span>
        </button>
      )}
    </div>
  );
}
