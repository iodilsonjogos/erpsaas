import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function LoginPage() {
  const [tab, setTab] = useState("login");
  const navigate = useNavigate();

  // Estado para login
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroLogin, setErroLogin] = useState("");

  // Estado para cadastro
  const [cadastro, setCadastro] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "pj",
    cnpj: "",
    cpf: "",
    telefone: "",
    segmento: "",
    empresa: "",
  });
  const [erroCadastro, setErroCadastro] = useState("");
  const segmentos = [
    "Barbearia", "Salão de Beleza", "Esmalteria", "Manicure",
    "Clínica de Estética", "Cabeleireiro", "Depilação", "Maquiagem",
    "Terapias Holísticas", "Personal Trainer", "Consultoria de Estilo",
    "Oficina Mecânica", "Quiropraxia", "Pet Shop", "Consultoria", "Outros"
  ];

  // Handler login
  const handleLogin = async (e) => {
  e.preventDefault();
  setErroLogin("");
  try {
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });
    if (response.ok) {
      const { token } = await response.json();
      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
      } else {
        setErroLogin("Token inválido retornado pelo servidor.");
      }
    } else {
      setErroLogin("E-mail ou senha inválidos");
    }
  } catch (error) {
    setErroLogin("Erro ao conectar ao servidor.");
  }
};


  // Handler cadastro
  function handleCadastroChange(e) {
    const { name, value } = e.target;
    setCadastro((prev) => ({ ...prev, [name]: value }));
  }
  async function handleCadastro(e) {
    e.preventDefault();
    setErroCadastro("");
    try {
      const { data } = await axios.post("http://localhost:4000/api/auth/register", cadastro);
      localStorage.setItem("token", data.token);
      navigate("/onboarding/WelcomeOnboarding");
    } catch (err) {
      setErroCadastro(err.response?.data?.mensagem || "Erro ao cadastrar.");
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="container" style={{ maxWidth: 900 }}>
        <div className="row shadow rounded-4 bg-white overflow-hidden">
          {/* Lado esquerdo - Apresentação */}
          <div className="col-md-6 bg-primary text-white d-flex flex-column justify-content-center align-items-center py-5">
            <img src="/logo.svg" alt="ERP SaaS" width={100} className="mb-3" />
            <h2 className="fw-bold mb-2">Bem-vindo ao ERP Multiempresa!</h2>
            <ul className="mb-2 fs-5">
              <li>✓ Multisegmento</li>
              <li>✓ Dashboard em tempo real</li>
              <li>✓ Controle financeiro completo</li>
            </ul>
          </div>
          {/* Lado direito - Tabs Login/Cadastro */}
          <div className="col-md-6 p-5">
            <div className="mb-4 d-flex">
              <button
                className={`btn btn-link flex-fill fw-bold ${tab === "login" ? "text-primary border-bottom border-primary" : "text-secondary"}`}
                onClick={() => setTab("login")}
                style={{ textDecoration: "none" }}
              >
                Entrar
              </button>
              <button
                className={`btn btn-link flex-fill fw-bold ${tab === "register" ? "text-primary border-bottom border-primary" : "text-secondary"}`}
                onClick={() => setTab("register")}
                style={{ textDecoration: "none" }}
              >
                Criar Conta
              </button>
            </div>
            {/* Formulário de Login */}
            {tab === "login" && (
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>
                {erroLogin && (
                  <div className="alert alert-danger py-2">{erroLogin}</div>
                )}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <button type="submit" className="btn btn-primary w-50">
                    Entrar
                  </button>
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => navigate("/login/esqueci-senha")}
                  >
                    Esqueci minha senha
                  </button>
                </div>
              </form>
            )}

            {tab === "register" && (
              <form onSubmit={handleCadastro}>
                {erroCadastro && (
                  <div className="alert alert-danger">{erroCadastro}</div>
                )}
                <div className="mb-3">
                  <label className="form-label">Tipo de cadastro:</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="tipo" value="pj"
                        checked={cadastro.tipo === "pj"} onChange={handleCadastroChange} />
                      <label className="form-check-label">Empresa (CNPJ)</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="tipo" value="pf"
                        checked={cadastro.tipo === "pf"} onChange={handleCadastroChange} />
                      <label className="form-check-label">Profissional Autônomo (CPF)</label>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Nome completo / Nome da empresa</label>
                  <input type="text" className="form-control" name="nome" required
                    value={cadastro.nome} onChange={handleCadastroChange} />
                </div>
                {cadastro.tipo === "pj" ? (
                  <div className="mb-3">
                    <label className="form-label">CNPJ</label>
                    <input type="text" className="form-control" name="cnpj" required
                      value={cadastro.cnpj} onChange={handleCadastroChange} />
                  </div>
                ) : (
                  <>
                    <div className="mb-3">
                      <label className="form-label">CPF</label>
                      <input type="text" className="form-control" name="cpf" required
                        value={cadastro.cpf} onChange={handleCadastroChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Nome do negócio (ex: Salão da Dauva)</label>
                      <input type="text" className="form-control" name="empresa"
                        value={cadastro.empresa} onChange={handleCadastroChange} />
                    </div>
                  </>
                )}
                <div className="mb-3">
                  <label className="form-label">Segmento do negócio</label>
                  <select className="form-select" name="segmento" required
                    value={cadastro.segmento} onChange={handleCadastroChange}>
                    <option value="">Selecione...</option>
                    {segmentos.map(seg => <option key={seg}>{seg}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Telefone</label>
                  <input type="text" className="form-control" name="telefone"
                    value={cadastro.telefone} onChange={handleCadastroChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">E-mail</label>
                  <input type="email" className="form-control" name="email" required
                    value={cadastro.email} onChange={handleCadastroChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Senha</label>
                  <input type="password" className="form-control" name="senha" required
                    value={cadastro.senha} onChange={handleCadastroChange} />
                </div>
                <button className="btn btn-primary w-100 mt-2" type="submit">Cadastrar</button>
                <div className="text-center mt-3">
                  Já tem uma conta? <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => setTab("login")}>Entrar</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
