import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarFidelidade, editarFidelidade } from "./fidelidadeService";

export default function FidelidadeModal({ open, setOpen, fidelidade, onRefresh }) {
  const [form, setForm] = useState({
    cliente_nome: "",
    pontos: "",
    resgatado: false,
    descricao: "",
    data: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fidelidade)
      setForm({
        ...fidelidade,
        data: fidelidade.data ? fidelidade.data.split("T")[0] : ""
      });
    else setForm({
      cliente_nome: "",
      pontos: "",
      resgatado: false,
      descricao: "",
      data: ""
    });
  }, [fidelidade, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (fidelidade && fidelidade.id) {
        await editarFidelidade(fidelidade.id, form);
      } else {
        await criarFidelidade(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar fidelidade!");
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
          {fidelidade ? "Editar Registro" : "Novo Registro"}
        </h2>
        <FormInput
          label="Cliente"
          name="cliente_nome"
          value={form.cliente_nome || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Pontos"
          name="pontos"
          type="number"
          value={form.pontos || ""}
          onChange={handleChange}
          required
        />
        <div className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="resgatado"
            checked={form.resgatado}
            onChange={handleChange}
            id="resgatado"
          />
          <label htmlFor="resgatado">Resgatado</label>
        </div>
        <FormInput
          label="Descrição"
          name="descricao"
          value={form.descricao || ""}
          onChange={handleChange}
        />
        <FormInput
          label="Data"
          name="data"
          type="date"
          value={form.data || ""}
          onChange={handleChange}
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
