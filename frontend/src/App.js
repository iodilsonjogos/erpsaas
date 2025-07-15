import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// IMPORTAÇÃO DE PÁGINAS (AJUSTE OS CAMINHOS CASO SUA ESTRUTURA SEJA DIFERENTE)
import LoginPage from "./pages/login/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import HomePage from "./pages/home/HomePage";
import UsuariosPage from "./pages/usuarios/UsuariosPage";
import ClientesPage from "./pages/clientes/ClientesPage";
import AgendaPage from "./pages/agenda/AgendaPage";
import FinanceiroPage from "./pages/financeiro/FinanceiroPage";
import ProfissionaisPage from "./pages/profissionais/ProfissionaisPage";
import ServicosPage from "./pages/servicos/ServicosPage";
import ProdutosPage from "./pages/produtos/ProdutosPage";
import RelatoriosPage from "./pages/relatorios/RelatoriosPage";
import RelatorioVendasPage from "./pages/relatorios/RelatorioVendasPage";
import ConfiguracoesPage from "./pages/configuracoes/ConfiguracoesPage";
import EmpresaPage from "./pages/config/EmpresaPage";
import UsuarioPage from "./pages/config/UsuarioPage";
import VendasPage from "./pages/vendas/VendasPage";
import FilaEsperaPage from "./pages/filaespera/FilaEsperaPage";
import BloqueioPage from "./pages/bloqueio/BloqueioPage";
import FidelidadePage from "./pages/fidelidade/FidelidadePage";
import ComissoesPage from "./pages/comissoes/ComissoesPage";
import AutomacaoPage from "./pages/automacao/AutomacaoPage";
import MarketingPage from "./pages/marketing/MarketingPage";
import PermissoesPage from "./pages/permissoes/PermissoesPage";
import PlanosPage from "./pages/planos/PlanosPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import LandingPage from "./pages/public/LandingPage";
import ClienteDashboardPage from "./pages/clientes/ClienteDashboardPage";
import IntegracoesPage from "./pages/integracoes/IntegracoesPage";
import AvaliacaoPage from "./pages/avaliacao/AvaliacaoPage";
import ContatoPage from "./pages/contato/ContatoPage";
import NotificacoesPage from "./pages/notificacoes/NotificacoesPage";
import LogsPage from "./pages/logs/LogsPage";
import FaqPage from "./pages/faq/FaqPage";
import ChecklistPage from "./pages/checklist/ChecklistPage";

// Protege rotas para usuários autenticados
function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

// (Opcional) Você pode criar um componente para proteger rotas por perfil
// Exemplo: somente admin pode acessar dashboard
function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user.perfil === "admin"
    ? children
    : <Navigate to="/home" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/public" element={<LandingPage />} />

        {/* Redirecionamento base */}
        <Route path="/" element={
          <PrivateRoute>
            <AdminRoute>
              <DashboardPage />
            </AdminRoute>
          </PrivateRoute>
        } />
        {/* Home para usuários não-admin */}
        <Route path="/home" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />

        {/* Módulos protegidos */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <AdminRoute>
              <DashboardPage />
            </AdminRoute>
          </PrivateRoute>
        } />
        <Route path="/usuarios" element={
          <PrivateRoute>
            <UsuariosPage />
          </PrivateRoute>
        } />
        <Route path="/clientes" element={
          <PrivateRoute>
            <ClientesPage />
          </PrivateRoute>
        } />
        <Route path="/agenda" element={
          <PrivateRoute>
            <AgendaPage />
          </PrivateRoute>
        } />
        <Route path="/financeiro" element={
          <PrivateRoute>
            <FinanceiroPage />
          </PrivateRoute>
        } />
        <Route path="/profissionais" element={
          <PrivateRoute>
            <ProfissionaisPage />
          </PrivateRoute>
        } />
        <Route path="/servicos" element={
          <PrivateRoute>
            <ServicosPage />
          </PrivateRoute>
        } />
        <Route path="/produtos" element={
          <PrivateRoute>
            <ProdutosPage />
          </PrivateRoute>
        } />
        <Route path="/relatorios" element={
          <PrivateRoute>
            <RelatoriosPage />
          </PrivateRoute>
        } />
        <Route path="/relatorios/vendas" element={
          <PrivateRoute>
            <RelatorioVendasPage />
          </PrivateRoute>
        } />
        <Route path="/configuracoes" element={
          <PrivateRoute>
            <ConfiguracoesPage />
          </PrivateRoute>
        } />
        <Route path="/config/empresa" element={
          <PrivateRoute>
            <EmpresaPage />
          </PrivateRoute>
        } />
        <Route path="/config/usuario" element={
          <PrivateRoute>
            <UsuarioPage />
          </PrivateRoute>
        } />
        <Route path="/vendas" element={
          <PrivateRoute>
            <VendasPage />
          </PrivateRoute>
        } />
        <Route path="/filaespera" element={
          <PrivateRoute>
            <FilaEsperaPage />
          </PrivateRoute>
        } />
        <Route path="/bloqueio" element={
          <PrivateRoute>
            <BloqueioPage />
          </PrivateRoute>
        } />
        <Route path="/fidelidade" element={
          <PrivateRoute>
            <FidelidadePage />
          </PrivateRoute>
        } />
        <Route path="/comissoes" element={
          <PrivateRoute>
            <ComissoesPage />
          </PrivateRoute>
        } />
        <Route path="/automacao" element={
          <PrivateRoute>
            <AutomacaoPage />
          </PrivateRoute>
        } />
        <Route path="/marketing" element={
          <PrivateRoute>
            <MarketingPage />
          </PrivateRoute>
        } />
        <Route path="/permissoes" element={
          <PrivateRoute>
            <PermissoesPage />
          </PrivateRoute>
        } />
        <Route path="/planos" element={
          <PrivateRoute>
            <PlanosPage />
          </PrivateRoute>
        } />
        <Route path="/onboarding" element={
          <PrivateRoute>
            <OnboardingPage />
          </PrivateRoute>
        } />
        <Route path="/clientes/dashboard" element={
          <PrivateRoute>
            <ClienteDashboardPage />
          </PrivateRoute>
        } />
        <Route path="/integracoes" element={
          <PrivateRoute>
            <IntegracoesPage />
          </PrivateRoute>
        } />
        <Route path="/avaliacao" element={
          <PrivateRoute>
            <AvaliacaoPage />
          </PrivateRoute>
        } />
        <Route path="/contato" element={
          <PrivateRoute>
            <ContatoPage />
          </PrivateRoute>
        } />
        <Route path="/notificacoes" element={
          <PrivateRoute>
            <NotificacoesPage />
          </PrivateRoute>
        } />
        <Route path="/logs" element={
          <PrivateRoute>
            <LogsPage />
          </PrivateRoute>
        } />
        <Route path="/faq" element={
          <PrivateRoute>
            <FaqPage />
          </PrivateRoute>
        } />
        <Route path="/checklist" element={
          <PrivateRoute>
            <ChecklistPage />
          </PrivateRoute>
        } />
        {/* Rota de fallback */}
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}


