import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para configurar ou editar integração.
 * Props: open (boolean), setOpen (função), integracao (objeto ou null)
 */
export default function IntegracaoModal({ open, setOpen, integracao }) {
  const [form, setForm] = useState({
    nome: "",
    tipo: "",
    status: true,
    conectado_com: "",
    credenciais: "",
  });

  useEffect(() => {
    if (integracao) setForm(integracao);
    else setForm({
      nome: "",
      tipo: "",
      status: true,
      conectado_com: "",
      credenciais: "",
    });
  }, [integracao, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de salvar/editar integração (chamar service)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {integracao ? "Configurar Integração" : "Nova Integração"}
        </h2>
        <FormInput
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <div className="mb-3">
          <label className="block mb-1">Tipo</label>
          <select
            className="w-full border rounded p-2"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Selecione...</option>
            <option value="Google Calendar">Google Calendar</option>
            <option value="Pagamentos">Pagamentos</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
        <FormInput
          label="Conectado com"
          name="conectado_com"
          value={form.conectado_com}
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
          <label htmlFor="status">Ativa</label>
        </div>
        <FormInput
          label="Credenciais (Token, API Key, etc)"
          name="credenciais"
          value={form.credenciais}
          onChange={handleChange}
        />
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
