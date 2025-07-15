import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarComissao, editarComissao } from "./comissoesService";

export default function ComissoesModal({ open, setOpen, comissao, onRefresh }) {
  const [form, setForm] = useState({
    profissional_nome: "",
    servico_nome: "",
    venda_id: "",
    valor_comissao: "",
    data: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (comissao)
      setForm({
        ...comissao,
        data: comissao.data ? comissao.data.split("T")[0] : ""
      });
    else setForm({
      profissional_nome: "",
      servico_nome: "",
      venda_id: "",
      valor_comissao: "",
      data: "",
    });
  }, [comissao, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (comissao && comissao.id) {
        await editarComissao(comissao.id, form);
      } else {
        await criarComissao(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar comissão!");
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
          {comissao ? "Editar Comissão" : "Nova Comissão"}
        </h2>
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
        />
        <FormInput
          label="Venda ID"
          name="venda_id"
          value={form.venda_id || ""}
          onChange={handleChange}
        />
        <FormInput
          label="Valor Comissão"
          name="valor_comissao"
          type="number"
          value={form.valor_comissao || ""}
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
