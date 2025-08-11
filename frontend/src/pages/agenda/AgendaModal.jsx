import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarAgendamento, editarAgendamento } from "./agendaService";
import axios from "axios";

export default function AgendaModal({ open, setOpen, agendamento, onRefresh }) {
  const [form, setForm] = useState({
    cliente_id: "",
    profissional_id: "",
    servico_id: "",
    data: "",
    hora: "",
    status: "Pendente"
  });
  const [clientes, setClientes] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      const token = localStorage.getItem("token");
      const api = process.env.REACT_APP_API_URL;
      const [cli, prof, serv] = await Promise.all([
        axios.get(`${api}/clientes`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${api}/profissionais`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${api}/servicos`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setClientes(cli.data);
      setProfissionais(prof.data);
      setServicos(serv.data);
    }
    if (open) fetchAll();
  }, [open]);

  useEffect(() => {
    if (agendamento)
      setForm({
        cliente_id: agendamento.cliente_id || "",
        profissional_id: agendamento.profissional_id || "",
        servico_id: agendamento.servico_id || "",
        data: agendamento.data ? agendamento.data.split("T")[0] : "",
        hora: agendamento.hora || "",
        status: agendamento.status || "Pendente",
      });
    else setForm({
      cliente_id: "",
      profissional_id: "",
      servico_id: "",
      data: "",
      hora: "",
      status: "Pendente"
    });
  }, [agendamento, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (agendamento && agendamento.id) {
        await editarAgendamento(agendamento.id, form);
      } else {
        await criarAgendamento(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar agendamento!");
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {agendamento ? "Editar Agendamento" : "Novo Agendamento"}
        </h2>
        {/* Cliente */}
        <label className="block mb-1">Cliente</label>
        <select
          className="form-select mb-3"
          name="cliente_id"
          value={form.cliente_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o cliente</option>
          {clientes.map((c) => (
            <option value={c.id} key={c.id}>{c.nome}</option>
          ))}
        </select>
        {/* Profissional */}
        <label className="block mb-1">Profissional</label>
        <select
          className="form-select mb-3"
          name="profissional_id"
          value={form.profissional_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o profissional</option>
          {profissionais.map((p) => (
            <option value={p.id} key={p.id}>{p.nome}</option>
          ))}
        </select>
        {/* Serviço */}
        <label className="block mb-1">Serviço</label>
        <select
          className="form-select mb-3"
          name="servico_id"
          value={form.servico_id}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o serviço</option>
          {servicos.map((s) => (
            <option value={s.id} key={s.id}>{s.nome}</option>
          ))}
        </select>
        <FormInput
          label="Data"
          name="data"
          type="date"
          value={form.data || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Hora"
          name="hora"
          type="time"
          value={form.hora || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Status"
          name="status"
          value={form.status || "Pendente"}
          onChange={handleChange}
          required
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
