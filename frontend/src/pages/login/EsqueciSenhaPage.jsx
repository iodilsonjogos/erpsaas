import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setEnviado(false);

    if (!email) {
      setErro("Informe um e-mail válido.");
      return;
    }

    try {
      // Exemplo de endpoint (ajuste se for diferente!)
      await axios.post("http://localhost:4000/api/usuarios/recuperar-senha", { email });
      setEnviado(true);
    } catch (err) {
      setErro("Não foi possível enviar a solicitação. Tente novamente.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow" style={{ maxWidth: 400, width: "100%" }}>
        <h3 className="mb-4 text-center">Recuperar senha</h3>

        {enviado && (
          <div className="alert alert-success">
            Se o e-mail estiver cadastrado, você receberá instruções para redefinir a senha.
          </div>
        )}

        {erro && <div className="alert alert-danger">{erro}</div>}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Seu e-mail</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Recuperar senha
          </button>
        </form>

        <div className="mt-3 text-center">
          <Link to="/login">Voltar para login</Link>
        </div>
      </div>
    </div>
  );
}
