// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

const MENU_ITEMS = [
  { icon: "bi-house", label: "Home", path: "/home" },
  { icon: "bi-dashboard", label: "Dashboard", path: "/dashboard" },
  { icon: "bi-calendar3", label: "Agenda", path: "/agenda" },
  { icon: "bi-person", label: "Clientes", path: "/clientes" },
  { icon: "bi-people", label: "Profissionais", path: "/profissionais" },
  { icon: "bi-scissors", label: "Serviços", path: "/servicos" },
  { icon: "bi-box-seam", label: "Produtos", path: "/produtos" },
  { icon: "bi-cash-coin", label: "Financeiro", path: "/financeiro" },
  { icon: "bi-graph-up", label: "Relatórios", path: "/relatorios" },
  { icon: "bi-gear", label: "Configurar", path: "/configurar" },
];

export default function Sidebar({ expanded, toggleSidebar }) {
  return (
    <aside className={`sidebar${expanded ? " expanded" : " collapsed"}`}>
      <nav>
        <ul>
          {MENU_ITEMS.map((item) => (
            <li key={item.label}>
              <Link to={item.path} className="sidebar__link">
              <i className={`bi ${item.icon}`}></i>
              {expanded && <span className="sidebar__label">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}