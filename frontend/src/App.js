import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import UsuariosPage from "./pages/usuarios/UsuariosPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ClientesPage from "./pages/clientes/ClientesPage";
// Simples proteção de rota: só deixa entrar se houver token
function PrivateRoute({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/"      element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/usuarios" element={<PrivateRoute><UsuariosPage /></PrivateRoute>} />
        <Route path="/clientes" element={<PrivateRoute><ClientesPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
