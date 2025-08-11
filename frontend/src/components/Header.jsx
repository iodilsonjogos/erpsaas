// src/components/Header.jsx
import React from "react";
import "../styles/TopoDashboard.css";

export default function Header({
  nomeEmpresa = "Empresa Exemplo",
  nomeUsuario = "Usuário Logado",
  avatarUrl = "/avatar.png",
  onToggleMenu,
}) {
    return (
    <header className="topo-dashboard">
      {/* Esquerda: Logo, nome sistema, toggle menu */}
      <div className="topo-dashboard__left">
        <img src="/logo192.png" alt="Logo Mgr." className="topo-dashboard__logo" />
        <span className="topo-dashboard__sistema">Mgr. Multiempresas</span>
        <button
          className="topo-dashboard__menu-btn"
          onClick={onToggleMenu}
          title="Expandir/recolher menu"
        >
          <span className="bi bi-list" style={{ fontSize: 22 }} />
        </button>
      </div>
      {/* Centro: nome da empresa */}
      <div className="topo-dashboard__center">
        <span className="topo-dashboard__empresa">{nomeEmpresa}</span>
      </div>
      {/* Direita: Notificação, avatar/nome usuário */}
      <div className="topo-dashboard__right">
        <button className="topo-dashboard__notify" title="Notificações">
          <span className="bi bi-bell" style={{ fontSize: 19, verticalAlign: "middle" }} />
        </button>
        <button className="topo-dashboard__user" title="Perfil do usuário">
          <img src={avatarUrl} alt="Avatar" className="topo-dashboard__avatar" />
          <span className="topo-dashboard__user-nome">{nomeUsuario}</span>
        </button>
      </div>
    </header>
  );
}