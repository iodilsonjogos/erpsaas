import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarNotificacao, editarNotificacao } from "./notificacoesService";

export default function NotificacoesModal({ open, setOpen, notificacao, onRefresh }) {
  const [form, setForm] = useState({
    tipo: "Agendamento",
    destino: "",
    titulo: "",
    mensagem: "",
    data_envio: "",
    status: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (notificacao)
      setForm({
        ...notificacao,
        data_envio: notificacao.data_envio ? notificacao.data_envio.split("T")[0] : "",
        status: Boolean(notificacao.status)
      });
    else setForm({
      tipo: "Agendamento",
      destino: "",
      titulo: "",
      mensagem: "",
      data_envio: "",
      status: false
    });
  }, [notificacao, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (notificacao && notificacao.id) {
        await editarNotificacao(notificacao.id, form);
      } else {
        await criarNotificacao(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar notificação!");
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
          {notificacao ? "Editar Notificação" : "Nova Notificação"}
        </h2>
        <div className="mb-3">
          <label className="block mb-1">Tipo</label>
          <select className="w-full border rounded p-2" name="tipo" value={form.tipo} onChange={handleChange}>
            <option value="Agendamento">Agendamento</option>
            <option value="Lembrete">Lembrete</option>
            <option value="Promoção">Promoção</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <FormInput
          label="Destino"
          name="destino"
          value={form.destino || ""}
          onChange={handleChange}
          placeholder="Cliente, Profissional, Todos"
          required
        />
        <FormInput
          label="Título"
          name="titulo"
          value={form.titulo || ""}
          onChange={handleChange}
          required
        />
        <div className="mb-3">
          <label className="block mb-1">Mensagem</label>
          <textarea
            className="w-full border rounded p-2"
            name="mensagem"
            value={form.mensagem || ""}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>
        <FormInput
          label="Data de Envio"
          name="data_envio"
          type="date"
          value={form.data_envio || ""}
          onChange={handleChange}
        />
        <div className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={handleChange}
            id="status"
          />
          <label htmlFor="status">Enviada</label>
        </div>
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
