import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar ou editar automação.
 * Props: open (boolean), setOpen (função), automacao (objeto ou null)
 */
export default function AutomacaoModal({ open, setOpen, automacao }) {
  const [form, setForm] = useState({
    tipo: "",
    mensagem: "",
    canal: "WhatsApp",
    gatilho: "Agendamento",
    ativo: true,
  });

  useEffect(() => {
    if (automacao) setForm(automacao);
    else setForm({ tipo: "", mensagem: "", canal: "WhatsApp", gatilho: "Agendamento", ativo: true });
  }, [automacao, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de salvar/editar automação (chamar service)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {automacao ? "Editar Automação" : "Nova Automação"}
        </h2>
        <FormInput
          label="Tipo"
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          required
        />
        <div className="mb-3">
          <label className="block mb-1">Mensagem</label>
          <textarea
            className="w-full border rounded p-2"
            name="mensagem"
            value={form.mensagem}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Canal</label>
          <select
            className="w-full border rounded p-2"
            name="canal"
            value={form.canal}
            onChange={handleChange}
          >
            <option value="WhatsApp">WhatsApp</option>
            <option value="E-mail">E-mail</option>
            <option value="SMS">SMS</option>
            <option value="Push">Push</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1">Gatilho</label>
          <select
            className="w-full border rounded p-2"
            name="gatilho"
            value={form.gatilho}
            onChange={handleChange}
          >
            <option value="Agendamento">Agendamento</option>
            <option value="Aniversário">Aniversário</option>
            <option value="Pagamento">Pagamento</option>
            <option value="Recorrência">Recorrência</option>
          </select>
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
