import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar ou editar comissão.
 * Props: open (boolean), setOpen (função), comissao (objeto ou null)
 */
export default function ComissoesModal({ open, setOpen, comissao }) {
  const [form, setForm] = useState({
    profissional: "",
    servico: "",
    valor_servico: "",
    percentual: "",
    valor_comissao: "",
    data: "",
    status: "Pendente"
  });

  useEffect(() => {
    if (comissao) setForm(comissao);
    else setForm({
      profissional: "",
      servico: "",
      valor_servico: "",
      percentual: "",
      valor_comissao: "",
      data: "",
      status: "Pendente"
    });
  }, [comissao, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de salvar/editar comissão (chamar service)
    setOpen(false);
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
          name="profissional"
          value={form.profissional}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Serviço"
          name="servico"
          value={form.servico}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Valor do Serviço"
          name="valor_servico"
          type="number"
          value={form.valor_servico}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Comissão (%)"
          name="percentual"
          type="number"
          value={form.percentual}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Valor da Comissão"
          name="valor_comissao"
          type="number"
          value={form.valor_comissao}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Data"
          name="data"
          type="date"
          value={form.data}
          onChange={handleChange}
          required
        />
        <div className="mb-3">
          <label className="block mb-1">Status</label>
          <select
            className="w-full border rounded p-2"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
          >
            <option value="Pendente">Pendente</option>
            <option value="Pago">Pago</option>
            <option value="Aguardando">Aguardando</option>
          </select>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
