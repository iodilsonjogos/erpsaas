import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/login/RegisterPage";
import LandingPage from "./pages/landing/LandingPage";
import OnboardingPage from "./pages/onboarding/OnboardingPage";
import WelcomeOnboarding from "./pages/onboarding/WelcomeOnboarding";
import DashboardPage from "./pages/dashboard/DashboardPage";
import HomePage from "./pages/home/HomePage";

export default function App() {
    const theme = localStorage.getItem("theme") || "theme-default";
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/register" element={<RegisterPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/onboarding/welcome" element={<WelcomeOnboarding />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<div className="p-5 text-center">Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}
