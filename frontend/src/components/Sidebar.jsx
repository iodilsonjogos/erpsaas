import React, { useState } from "react";
import { Home, Calendar, Users, BarChart, Layers, ShoppingCart, Briefcase, Settings } from "lucide-react";

const menu = [
  { label: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
  { label: "Agenda", icon: <Calendar size={20} />, path: "/agenda" },
  { label: "Clientes", icon: <Users size={20} />, path: "/clientes" },
  { label: "Profissionais", icon: <Briefcase size={20} />, path: "/profissionais" },
  { label: "Serviços", icon: <Layers size={20} />, path: "/servicos" },
  { label: "Produtos", icon: <ShoppingCart size={20} />, path: "/produtos" },
  { label: "Financeiro", icon: <BarChart size={20} />, path: "/financeiro" },
  { label: "Relatórios", icon: <BarChart size={20} />, path: "/relatorios" },
  { label: "Configurar", icon: <Settings size={20} />, path: "/configuracoes" },
];

export default function Sidebar() {
  const [expandido, setExpandido] = useState(true);

  return (
    <aside className={`bg-white shadow h-screen transition-all duration-300 ${expandido ? "w-60" : "w-16"} flex flex-col`}>
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <span className={`font-bold text-lg text-blue-700 transition-all duration-300 ${!expandido && "hidden"}`}>
          Nome da Empresa
        </span>
        <button onClick={() => setExpandido((v) => !v)} className="p-2 text-gray-500 hover:text-blue-600">
          <span className="sr-only">Expandir/retrair menu</span>
          {expandido ? "<" : ">"}
        </button>
      </div>
      <nav className="flex-1 py-4 space-y-2">
        {menu.map((item, idx) => (
          <a
            key={idx}
            href={item.path}
            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-50 rounded transition"
          >
            {item.icon}
            <span className={`transition-all duration-300 ${!expandido && "hidden"}`}>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
