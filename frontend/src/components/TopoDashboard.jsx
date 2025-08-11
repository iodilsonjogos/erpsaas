import React from "react";
import "../styles/TopoDashboard.css"; 

const TopoDashboard = ({
  nomeEmpresa = "Minha Empresa",
  nomeUsuario = "Nome Usuário",
  avatarUrl = "/avatar.png",
  onToggleMenu
}) => (
  <header className="topo-dashboard">
    <div className="topo-dashboard__left">
      <img src="../img/logo_mgr_multiempresas.png" alt="Mgr. Multiempresas" className="topo-dashboard__logo" />
      <span className="topo-dashboard__empresa">{nomeEmpresa}</span>
      <button className="topo-dashboard__menu-btn" onClick={onToggleMenu} title="Expandir/recolher menu">
        <span className="topo-dashboard__menu-icon">&#9776;</span>
      </button>
    </div>
    <div className="topo-dashboard__right">
      <button className="topo-dashboard__notify" title="Notificações">
        <span role="img" aria-label="Notificação">&#128276;</span>
      </button>
      <div className="topo-dashboard__user">
        <img src={avatarUrl} alt="Avatar" className="topo-dashboard__avatar" />
        <span className="topo-dashboard__user-nome">{nomeUsuario}</span>
      </div>
    </div>
  </header>
);

export default TopoDashboard;
