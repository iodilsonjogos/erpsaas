// === Arquivo: src/pages/agenda/AgendaModal.jsx ===

import React, { useState, useEffect } from "react";
import { criarAgendamento, editarAgendamento, excluirAgendamento } from "./agendaService";

function AgendaModal({ open, onClose, dataInicial, dadosIniciais, modoEdicao, onRefresh }) {
  const [form, setForm] = useState({
    nome_cliente: "",
    telefone: "",
    profissional_id: "",
    servico_id: "",
    data: "",
    hora: "",
    observacao: "",
    responsavel: ""
  });

  useEffect(() => {
    if (open) {
      const dataHoje = new Date().toISOString().split("T")[0];
      setForm(prev => ({
        ...prev,
        ...dadosIniciais,
        data: dataInicial?.toISOString().split("T")[0] || dataHoje,
      }));
    }
  }, [open, dataInicial, dadosIniciais]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSalvar = async () => {
    if (modoEdicao && dadosIniciais?.id) {
//*      await agendaService.atualizarAgendamento(dadosIniciais.id, form);*//
      await editarAgendamento(dadosIniciais.id, form);
    } else {
//*      await agendaService.criarAgendamento(form);*//
      await criarAgendamento(form);
    }
    onRefresh();
    onClose();
  };

  const handleExcluirAgendamento = async () => {
    if (!dadosIniciais?.id) return;
    const confirmado = window.confirm("Tem certeza que deseja excluir este agendamento?");
    if (confirmado) {
//*      await agendaService.excluirAgendamento(dadosIniciais.id);*//
      await excluirAgendamento(dadosIniciais.id);
      onRefresh();
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{modoEdicao ? "Editar Agendamento" : "Novo Agendamento"}</h2>
        <input name="nome_cliente" value={form.nome_cliente} onChange={handleChange} placeholder="Cliente" />
        <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" />
        <input name="data" value={form.data} onChange={handleChange} type="date" />
        <input name="hora" value={form.hora} onChange={handleChange} type="time" />
        <textarea name="observacao" value={form.observacao} onChange={handleChange} placeholder="Observação" />

        <div className="modal-actions">
          <button onClick={handleSalvar}>{modoEdicao ? "Salvar alterações" : "Agendar"}</button>
          {modoEdicao && (
            <button className="btn-excluir" onClick={handleExcluirAgendamento}>Excluir agendamento</button>
          )}
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default AgendaModal;
