import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    tipo: "pj", // 'pj' ou 'pf'
    cnpj: "",
    cpf: "",
    telefone: "",
    segmento: "",
    empresa: "",
  });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const segmentos = [
    "Barbearia", "Salão de Beleza", "Esmalteria", "Manicure",
    "Clínica de Estética", "Cabeleireiro", "Depilação", "Maquiagem",
    "Terapias Holísticas", "Personal Trainer", "Consultoria de Estilo",
    "Oficina Mecânica", "Quiropraxia", "Pet Shop", "Consultoria", "Outros"
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    try {
      const { data } = await axios.post("http://localhost:4000/api/auth/register", form);
      // Salva token, navega para onboarding
      localStorage.setItem("token", data.token);
      navigate("/onboarding/WelcomeOnboarding");
    } catch (err) {
      setErro(err.response?.data?.mensagem || "Erro ao cadastrar.");
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h3 className="mb-4">Criar Conta</h3>
            {erro && <div className="alert alert-danger">{erro}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Tipo de cadastro:</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="tipo" value="pj"
                      checked={form.tipo === "pj"} onChange={handleChange} />
                    <label className="form-check-label">Empresa (CNPJ)</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="tipo" value="pf"
                      checked={form.tipo === "pf"} onChange={handleChange} />
                    <label className="form-check-label">Profissional Autônomo (CPF)</label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Nome completo / Nome da empresa</label>
                <input type="text" className="form-control" name="nome" required
                  value={form.nome} onChange={handleChange} />
              </div>
              {form.tipo === "pj" ? (
                <div className="mb-3">
                  <label className="form-label">CNPJ</label>
                  <input type="text" className="form-control" name="cnpj" required
                    value={form.cnpj} onChange={handleChange} />
                </div>
              ) : (
                <>
                  <div className="mb-3">
                    <label className="form-label">CPF</label>
                    <input type="text" className="form-control" name="cpf" required
                      value={form.cpf} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nome do negócio (ex: Salão da Dauva)</label>
                    <input type="text" className="form-control" name="empresa"
                      value={form.empresa} onChange={handleChange} />
                  </div>
                </>
              )}
              <div className="mb-3">
                <label className="form-label">E-mail</label>
                <input type="email" className="form-control" name="email" required
                  value={form.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Telefone</label>
                <input type="text" className="form-control" name="telefone"
                  value={form.telefone} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Segmento do negócio</label>
                <select className="form-select" name="segmento" required
                  value={form.segmento} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  {segmentos.map(seg => <option key={seg}>{seg}</option>)}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Senha</label>
                <input type="password" className="form-control" name="senha" required
                  value={form.senha} onChange={handleChange} />
              </div>
              <button className="btn btn-primary w-100 mt-2" type="submit">Cadastrar</button>
              <div className="text-center mt-3">
                Já tem uma conta? <a href="/login">Entrar</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
