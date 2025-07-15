import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarAgendamento, editarAgendamento } from "./agendaService";

export default function AgendaModal({ open, setOpen, agendamento, onRefresh }) {
  const [form, setForm] = useState({
    cliente_nome: "",
    profissional_nome: "",
    servico_nome: "",
    data: "",
    hora: "",
    status: "Pendente"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (agendamento)
      setForm({
        ...agendamento,
        data: agendamento.data ? agendamento.data.split("T")[0] : ""
      });
    else setForm({
      cliente_nome: "",
      profissional_nome: "",
      servico_nome: "",
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
        <FormInput
          label="Cliente"
          name="cliente_nome"
          value={form.cliente_nome || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Profissional"
          name="profissional_nome"
          value={form.profissional_nome || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Serviço"
          name="servico_nome"
          value={form.servico_nome || ""}
          onChange={handleChange}
          required
        />
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
