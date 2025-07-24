import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Segments do negócio (pode editar à vontade)
const segmentos = [
  "Barbearia", "Salão de Beleza", "Esmalteria", "Manicure", "Clínica de Estética", "Cabeleireiro", "Depilação",
  "Maquiagem", "Terapias Holísticas", "Personal Trainer", "Consultoria de Estilo", "Oficina Mecânica",
  "Quiropraxia", "Pet Shop", "Consultoria", "Outros"
];

export default function LoginPage() {
  const [tab, setTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  const [erroLogin, setErroLogin] = useState("");

  // Cadastro
  const [tipo, setTipo] = useState("pj");
  const [nome, setNome] = useState("");
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [nomeNegocio, setNomeNegocio] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [segmento, setSegmento] = useState("");
  const [senha, setSenha] = useState("");
  const [erroCadastro, setErroCadastro] = useState("");
  const [sucessoCadastro, setSucessoCadastro] = useState(false);

  const navigate = useNavigate();

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setErroLogin("");
    try {
      const res = await axios.post("http://localhost:4000/api/usuarios/login", {
        email: loginEmail,
        senha: loginSenha
      });
      // Exemplo: salvar token, redirecionar, etc.
      localStorage.setItem("token", res.data.token);
      // Exemplo de role: admin
      if (res.data.usuario.perfil === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setErroLogin("E-mail ou senha inválidos");
    }
  };

  // Cadastro Handler
  const handleCadastro = async (e) => {
    e.preventDefault();
    setErroCadastro("");
    setSucessoCadastro(false);
    try {
      await axios.post("http://localhost:4000/api/usuarios/register", {
        tipo,
        nome,
        cnpj: tipo === "pj" ? cpfCnpj : "",
        cpf: tipo === "pf" ? cpfCnpj : "",
        nome_negocio: nomeNegocio,
        email,
        telefone,
        segmento,
        senha
      });
      setSucessoCadastro(true);
      setTimeout(() => navigate("/onboarding"), 1200); // Redireciona após sucesso
    } catch (err) {
      setErroCadastro("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="container d-flex min-vh-100 align-items-center justify-content-center">
      <div className="row shadow-lg rounded-4 bg-white overflow-hidden" style={{ minWidth: 900 }}>
        <div className="col-md-6 bg-primary text-white d-flex flex-column justify-content-center p-5">
          <img src="/logo.svg" alt="ERP SaaS" className="mb-4" style={{ width: 110 }} />
          <h2>Bem-vindo ao ERP Multiempresa!</h2>
          <ul className="mt-4">
            <li>✓ Multisegmento</li>
            <li>✓ Dashboard em tempo real</li>
            <li>✓ Controle financeiro completo</li>
          </ul>
        </div>
        <div className="col-md-6 p-4">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button className={`nav-link ${tab === "login" ? "active" : ""}`}
                onClick={() => setTab("login")}
                type="button">Entrar</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${tab === "cadastro" ? "active" : ""}`}
                onClick={() => setTab("cadastro")}
                type="button">Criar conta</button>
            </li>
          </ul>

          {/* Login */}
          {tab === "login" && (
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Seu e-mail</label>
                <input className="form-control" type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Senha</label>
                <input className="form-control" type="password" value={loginSenha} onChange={e => setLoginSenha(e.target.value)} required />
              </div>
              <div className="mb-2">
                <button type="button" className="btn btn-link px-0"
                  onClick={() => alert("Funcionalidade de recuperação de senha (implementar)!")}>
                  Esqueci minha senha
                </button>
              </div>
              {erroLogin && <div className="alert alert-danger py-2">{erroLogin}</div>}
              <button type="submit" className="btn btn-primary w-100 mb-3">Entrar</button>
              <div className="text-center">
                Ainda não possui uma conta?{" "}
                <button type="button" className="btn btn-link px-0" onClick={() => setTab("cadastro")}>Criar conta</button>
              </div>
            </form>
          )}

          {/* Cadastro */}
          {tab === "cadastro" && (
            <form onSubmit={handleCadastro}>
              <div className="mb-2 d-flex align-items-center gap-3">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="tipo" id="pj" value="pj" checked={tipo === "pj"} onChange={() => setTipo("pj")} />
                  <label className="form-check-label" htmlFor="pj">Empresa (CNPJ)</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="tipo" id="pf" value="pf" checked={tipo === "pf"} onChange={() => setTipo("pf")} />
                  <label className="form-check-label" htmlFor="pf">Profissional Autônomo (CPF)</label>
                </div>
              </div>
              <div className="mb-2">
                <label className="form-label">Nome completo / Nome da empresa</label>
                <input className="form-control" type="text" value={nome} onChange={e => setNome(e.target.value)} required />
              </div>
              {tipo === "pj" ? (
                <div className="mb-2">
                  <label className="form-label">CNPJ</label>
                  <input className="form-control" type="text" value={cpfCnpj} onChange={e => setCpfCnpj(e.target.value)} required />
                </div>
              ) : (
                <div className="mb-2">
                  <label className="form-label">CPF</label>
                  <input className="form-control" type="text" value={cpfCnpj} onChange={e => setCpfCnpj(e.target.value)} required />
                </div>
              )}
              <div className="mb-2">
                <label className="form-label">Nome do negócio (ex: Salão da Dauva)</label>
                <input className="form-control" type="text" value={nomeNegocio} onChange={e => setNomeNegocio(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label">E-mail</label>
                <input className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Telefone</label>
                <input className="form-control" type="text" value={telefone} onChange={e => setTelefone(e.target.value)} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Segmento do negócio</label>
                <select className="form-select" value={segmento} onChange={e => setSegmento(e.target.value)} required>
                  <option value="">Selecione o segmento</option>
                  {segmentos.map(seg => <option key={seg} value={seg}>{seg}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Senha</label>
                <input className="form-control" type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
              </div>
              {erroCadastro && <div className="alert alert-danger py-2">{erroCadastro}</div>}
              {sucessoCadastro && <div className="alert alert-success py-2">Cadastro realizado com sucesso!</div>}
              <button type="submit" className="btn btn-success w-100">Cadastrar</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
