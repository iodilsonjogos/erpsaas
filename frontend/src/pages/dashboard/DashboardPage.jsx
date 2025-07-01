import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042', '#00C49F'];

export default function DashboardPage() {
  const [dados, setDados] = useState(null);
  const [vendasMes, setVendasMes] = useState([]);
  const [produtosTop, setProdutosTop] = useState([]);

  useEffect(() => {
    async function fetchDados() {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      // Ajuste as URLs para bater com seu backend se necessário!
      const [dashboardRes, vendasMesRes, produtosTopRes] = await Promise.all([
        axios.get(process.env.REACT_APP_API_URL + '/dashboard', { headers }),
        axios.get(process.env.REACT_APP_API_URL + '/dashboard/vendas-mes', { headers }),
        axios.get(process.env.REACT_APP_API_URL + '/dashboard/produtos-top', { headers })
      ]);
      setDados(dashboardRes.data);
      setVendasMes(vendasMesRes.data.map(row => ({ mes: row.mes, total: parseFloat(row.total) })));
      setProdutosTop(produtosTopRes.data.map((item, idx) => ({
        name: item.nome,
        value: parseFloat(item.total),
        color: COLORS[idx % COLORS.length]
      })));
    }
    fetchDados();
  }, []);

  if (!dados) return <div className="p-4">Carregando dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <div className="text-xs">Clientes</div>
          <div className="text-3xl font-bold">{dados.totalClientes}</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <div className="text-xs">Receita mês</div>
          <div className="text-3xl font-bold">R$ {parseFloat(dados.receitaMes).toFixed(2)}</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <div className="text-xs">Vendas</div>
          <div className="text-3xl font-bold">{dados.totalVendas}</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 flex flex-col items-center">
          <div className="text-xs">Próximos Agendamentos</div>
          <div className="text-3xl font-bold">{dados.proximosAgendamentos}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h3 className="font-semibold mb-4">Vendas por Mês</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendasMes}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h3 className="font-semibold mb-4">Produtos Mais Vendidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={produtosTop}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
              >
                {produtosTop.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
<button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }}
  className="bg-red-500 text-white px-4 py-2 rounded"
>
  Sair
</button>
