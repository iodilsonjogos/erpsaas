import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { dia: "01", vendas: 6 },
  { dia: "02", vendas: 9 },
  { dia: "03", vendas: 8 },
  { dia: "04", vendas: 11 },
  { dia: "05", vendas: 10 },
  { dia: "06", vendas: 14 },
  { dia: "07", vendas: 12 },
];

export default function GraficoLinha() {
  return (
    <div className="bg-white rounded-xl shadow p-4 h-64">
      <h2 className="font-semibold mb-2">Vendas nos últimos 7 dias</h2>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="vendas" stroke="#a78bfa" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
