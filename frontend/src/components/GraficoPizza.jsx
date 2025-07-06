import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Beleza", value: 5400 },
  { name: "Estética", value: 4100 },
  { name: "Terapia", value: 3200 },
];

const COLORS = ["#60a5fa", "#a78bfa", "#f472b6"];

export default function GraficoPizza() {
  return (
    <div className="bg-white rounded-xl shadow p-4 h-64">
      <h2 className="font-semibold mb-2">Receita por categoria</h2>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name }) => name}
            outerRadius={55}
            dataKey="value"
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
