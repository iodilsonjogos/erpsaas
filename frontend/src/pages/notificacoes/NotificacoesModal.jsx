import React, { useState } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar nova notificação interna.
 * Props: open (boolean), setOpen (função)
 */
export default function NotificacoesModal({ open, setOpen }) {
  const [form, setForm] = useState({
    titulo: "",
    mensagem: ""
  });

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de enviar notificação (chamar service)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">Nova Notificação</h2>
        <FormInput
          label="Título"
          name="titulo"
          value={form.titulo}
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
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
