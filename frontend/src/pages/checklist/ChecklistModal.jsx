import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar ou editar item do checklist.
 * Props: open (boolean), setOpen (função), item (objeto ou null)
 */
export default function ChecklistModal({ open, setOpen, item }) {
  const [form, setForm] = useState({
    descricao: "",
    concluido: false
  });

  useEffect(() => {
    if (item) setForm(item);
    else setForm({ descricao: "", concluido: false });
  }, [item, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de salvar/editar item do checklist (chamar service)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {item ? "Editar Item" : "Novo Item"}
        </h2>
        <FormInput
          label="Descrição"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          required
        />
        <div className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="concluido"
            checked={form.concluido}
            onChange={handleChange}
            id="concluido"
          />
          <label htmlFor="concluido">Concluído</label>
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
