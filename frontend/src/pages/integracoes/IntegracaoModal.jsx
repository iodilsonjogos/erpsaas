import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarIntegracao, editarIntegracao } from "./integracoesService";

export default function IntegracaoModal({ open, setOpen, integracao, onRefresh }) {
  const [form, setForm] = useState({
    tipo: "",
    nome: "",
    status: true,
    dados: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (integracao) setForm(integracao);
    else setForm({ tipo: "", nome: "", status: true, dados: "" });
  }, [integracao, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (integracao && integracao.id) {
        await editarIntegracao(integracao.id, form);
      } else {
        await criarIntegracao(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar integração!");
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
          {integracao ? "Editar Integração" : "Nova Integração"}
        </h2>
        <FormInput
          label="Tipo"
          name="tipo"
          value={form.tipo || ""}
          onChange={handleChange}
          required
          placeholder="WhatsApp, E-mail, Gateway, etc"
        />
        <FormInput
          label="Nome"
          name="nome"
          value={form.nome || ""}
          onChange={handleChange}
          required
        />
        <div className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={handleChange}
            id="status"
          />
          <label htmlFor="status">Ativa</label>
        </div>
        <div className="mb-3">
          <label className="block mb-1">Configuração/Dados</label>
          <textarea
            className="w-full border rounded p-2"
            name="dados"
            value={form.dados || ""}
            onChange={handleChange}
            rows={3}
          />
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
