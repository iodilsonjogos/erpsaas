import React from "react";
import { useNavigate } from "react-router-dom";
export default function WelcomeOnboarding() {
  const navigate = useNavigate();
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-5">
            <h2>Bem-vindo ao ERP SaaS!</h2>
            <p className="lead mb-4">Sua conta foi criada e seu trial de 5 dias já está ativo.<br />
            <b>Próximos passos:</b></p>
            <ul>
              <li>Finalize o cadastro da sua empresa <b>(Configurações)</b></li>
              <li>Adicione a logo e dados fiscais</li>
              <li>Cadastre profissionais/colaboradores</li>
              <li>Escolha um plano após o período grátis</li>
            </ul>
            <button className="btn btn-primary mt-4" onClick={() => navigate("/configuracoes")}>
              Ir para Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
