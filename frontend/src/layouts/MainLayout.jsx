// src/MainLayout.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MainLayout({ children }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // Exemplo: nome empresa e usuário dinâmico (busque da API/Contexto futuramente)
  const nomeEmpresa = "Nome da Empresa Logada";
  const nomeUsuario = "Usuário Logado";
  const avatarUrl = "/avatar.png"; // Padrão, substitua pelo real

  // Função para expandir/recolher menu
  const toggleSidebar = () => setSidebarExpanded((prev) => !prev);

  return (
    <div className="main-layout">
      <Header
        nomeEmpresa={nomeEmpresa}
        nomeUsuario={nomeUsuario}
        avatarUrl={avatarUrl}
        onToggleMenu={toggleSidebar}
      />
      <div className="layout-root">
        <Sidebar expanded={sidebarExpanded} toggleSidebar={() => setSidebarExpanded(v => !v)} />
        <div className={`main-content ${sidebarExpanded ? "expanded" : "collapsed"}`}>
          <Header onToggleMenu={() => setSidebarExpanded(v => !v)} />
          <div className="content-wrapper">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}