// src/components/Sidebar.jsx
import React from "react";
import "../styles/Sidebar.css";

const MENU_ITEMS = [
  { icon: "bi-house", label: "Home" },
  { icon: "bi-dashboard", label: "Dashboard" },
  { icon: "bi-calendar3", label: "Agenda" },
  { icon: "bi-person", label: "Clientes" },
  { icon: "bi-people", label: "Profissionais" },
  { icon: "bi-scissors", label: "Serviços" },
  { icon: "bi-box-seam", label: "Produtos" },
  { icon: "bi-cash-coin", label: "Financeiro" },
  { icon: "bi-graph-up", label: "Relatórios" },
  { icon: "bi-gear", label: "Configurar" },
];

export default function Sidebar({ expanded, toggleSidebar }) {
  return (
    <aside className={`sidebar${expanded ? " expanded" : " collapsed"}`}>
      <nav>
        <ul>
          {MENU_ITEMS.map((item) => (
            <li key={item.label}>
              <i className={`bi ${item.icon}`}></i>
              {expanded && <span className="sidebar__label">{item.label}</span>}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
