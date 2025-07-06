import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar ou editar plano SaaS.
 * Props: open (boolean), setOpen (função), plano (objeto ou null)
 */
export default function PlanosModal({ open, setOpen, plano }) {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    valor: "",
    limite_clientes: "",
    limite_profissionais: "",
    limite_usuarios: "",
    status: "ativo",
  });

  useEffect(() => {
    if (plano) setForm(plano);
    else setForm({
      nome: "",
      descricao: "",
      valor: "",
      limite_clientes: "",
      limite_profissionais: "",
      limite_usuarios: "",
      status: "ativo"
    });
  }, [plano, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de salvar/editar plano (chamar service)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {plano ? "Editar Plano" : "Novo Plano"}
        </h2>
        <FormInput
          label="Nome do Plano"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Descrição"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
        />
        <FormInput
          label="Valor Mensal"
          name="valor"
          type="number"
          value={form.valor}
          onChange={handleChange}
        />
        <FormInput
          label="Limite Clientes"
          name="limite_clientes"
          type="number"
          value={form.limite_clientes}
          onChange={handleChange}
        />
        <FormInput
          label="Limite Profissionais"
          name="limite_profissionais"
          type="number"
          value={form.limite_profissionais}
          onChange={handleChange}
        />
        <FormInput
          label="Limite Usuários"
          name="limite_usuarios"
          type="number"
          value={form.limite_usuarios}
          onChange={handleChange}
        />
        <div className="mb-3">
          <label className="block mb-1">Status</label>
          <select
            className="w-full border rounded p-2"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
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
