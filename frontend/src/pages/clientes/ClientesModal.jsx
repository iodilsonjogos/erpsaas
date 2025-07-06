import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar ou editar cliente.
 * Recebe props: open (boolean), setOpen (função), cliente (objeto ou null)
 */
export default function ClientesModal({ open, setOpen, cliente }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: ""
  });

  useEffect(() => {
    if (cliente) setForm(cliente);
    else setForm({ nome: "", email: "", telefone: "" });
  }, [cliente, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai a lógica de salvar ou editar (chamar serviço)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[320px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {cliente ? "Editar Cliente" : "Cadastrar Cliente"}
        </h2>
        <FormInput
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <FormInput
          label="E-mail"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <FormInput
          label="Telefone"
          name="telefone"
          type="tel"
          value={form.telefone}
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
