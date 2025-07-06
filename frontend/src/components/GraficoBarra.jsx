import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Serviço A", vendas: 40 },
  { name: "Serviço B", vendas: 30 },
  { name: "Serviço C", vendas: 20 },
  { name: "Serviço D", vendas: 27 },
  { name: "Serviço E", vendas: 18 },
];

export default function GraficoBarra() {
  return (
    <div className="bg-white rounded-xl shadow p-4 h-64">
      <h2 className="font-semibold mb-2">Serviços mais vendidos</h2>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="vendas" fill="#60a5fa" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
