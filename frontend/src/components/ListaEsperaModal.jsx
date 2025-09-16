import React, { useState, useEffect } from "react";
import { adicionarListaEspera } from "../pages/home/homeService";
import InputMask from "react-input-mask";

export default function ListaEsperaModal({ open, setOpen, atualizarLista }) {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    servico: "",
    profissional: "",
    data: new Date().toISOString().split("T")[0],
    observacao: ""
  });

  const [erro, setErro] = useState("");

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nome || !form.telefone) {
      setErro("Nome e telefone são obrigatórios.");
      return;
    }

    const resposta = await adicionarListaEspera(form);
    if (resposta) {
      setErro("");
      atualizarLista();  // Atualiza a lista da Home
      setOpen(false);    // Fecha o modal
      setForm({
        nome: "",
        telefone: "",
        servico: "",
        profissional: "",
        data: new Date().toISOString().split("T")[0],
        observacao: ""
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: 480 }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Adicionar à lista de espera</h5>
          <button className="btn btn-sm btn-danger" onClick={() => setOpen(false)}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Cliente*</label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="form-control"
              placeholder="Digite o nome"
              required
            />
            <small className="text-muted">Buscar nome... (autocomplete em breve)</small>
          </div>

          <div className="mb-2">
            <label className="form-label">Telefone*</label>
            <InputMask
              mask="99 99999-9999"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="form-control"
              placeholder="84 9xxxx-xxxx"
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Serviço</label>
            <input
              name="servico"
              value={form.servico}
              onChange={handleChange}
              className="form-control"
              placeholder="Serviço desejado"
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Profissional</label>
            <input
              name="profissional"
              value={form.profissional}
              onChange={handleChange}
              className="form-control"
              placeholder="Nome do profissional"
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Data</label>
            <input
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
              className="form-control"
              disabled
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Observação</label>
            <textarea
              name="observacao"
              value={form.observacao}
              onChange={handleChange}
              className="form-control"
              placeholder="Observações adicionais"
            />
          </div>

          {erro && <div className="alert alert-danger py-1">{erro}</div>}

          <div className="text-end">
            <button type="submit" className="btn btn-success">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
