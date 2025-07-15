import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarAutomacao, editarAutomacao } from "./automacaoService";

export default function AutomacaoModal({ open, setOpen, automacao, onRefresh }) {
  const [form, setForm] = useState({
    nome: "",
    tipo: "",
    destino: "",
    mensagem: "",
    ativo: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (automacao) setForm(automacao);
    else setForm({ nome: "", tipo: "", destino: "", mensagem: "", ativo: true });
  }, [automacao, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (automacao && automacao.id) {
        await editarAutomacao(automacao.id, form);
      } else {
        await criarAutomacao(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar automação!");
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[320px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {automacao ? "Editar Automação" : "Nova Automação"}
        </h2>
        <FormInput
          label="Nome"
          name="nome"
          value={form.nome || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Tipo"
          name="tipo"
          value={form.tipo || ""}
          onChange={handleChange}
          placeholder="WhatsApp, Email, SMS, etc"
        />
        <FormInput
          label="Destino"
          name="destino"
          value={form.destino || ""}
          onChange={handleChange}
          placeholder="Ex: Cliente, Profissional, Todos"
        />
        <div className="mb-3">
          <label className="block mb-1">Mensagem</label>
          <textarea
            className="w-full border rounded p-2"
            name="mensagem"
            value={form.mensagem || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="ativo"
            checked={form.ativo}
            onChange={handleChange}
            id="ativo"
          />
          <label htmlFor="ativo">Ativo</label>
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
