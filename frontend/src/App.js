import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
// Importações dos seus componentes principais
import LoginPage from "./pages/login/LoginPage";
import HomePage from './pages/home/HomePage';
import DashboardPage from "./pages/dashboard/DashboardPage";
import AgendaPage from "./pages/agenda/AgendaPage";
import ClientesPage from "./pages/clientes/ClientesPage";
import ProfissionaisPage from "./pages/profissionais/ProfissionaisPage";
import ServicosPage from "./pages/servicos/ServicosPage";
import ProdutosPage from "./pages/produtos/ProdutosPage";
import FinanceiroPage from "./pages/financeiro/FinanceiroPage";
import RelatoriosPage from "./pages/relatorios/RelatoriosPage";
import ConfiguracoesPage from "./pages/configuracoes/ConfiguracoesPage";
import EsqueciSenhaPage from "./pages/login/EsqueciSenhaPage";

// Se algum componente ainda não existir, crie um arquivo base em branco como placeholder.

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><Navigate to="/login" /></MainLayout>} />
        <Route path="/home" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
        <Route path="/agenda" element={<MainLayout><AgendaPage /></MainLayout>} />
        <Route path="/clientes" element={<MainLayout><ClientesPage /></MainLayout>} />
        <Route path="/profissionais" element={<MainLayout><ProfissionaisPage /></MainLayout>} />
        <Route path="/servicos" element={<MainLayout><ServicosPage /></MainLayout>} />
        <Route path="/produtos" element={<MainLayout><ProdutosPage /></MainLayout>} />
        <Route path="/financeiro" element={<MainLayout><FinanceiroPage /></MainLayout>} />
        <Route path="/relatorios" element={<MainLayout><RelatoriosPage /></MainLayout>} />
        <Route path="/configuracoes" element={<MainLayout><ConfiguracoesPage /></MainLayout>} />
        <Route path="/login/esqueci-senha" element={<EsqueciSenhaPage />} />
        {/* Outras rotas que desejar */}
        <Route path="*" element={<MainLayout><div className="p-5">Página não encontrada</div></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
