import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar ou visualizar avaliação.
 * Props: open (boolean), setOpen (função), avaliacao (objeto ou null)
 */
export default function AvaliacaoModal({ open, setOpen, avaliacao }) {
  const [form, setForm] = useState({
    cliente_nome: "",
    profissional: "",
    servico: "",
    nota: "",
    comentario: "",
    data: "",
  });

  useEffect(() => {
    if (avaliacao) setForm(avaliacao);
    else setForm({
      cliente_nome: "",
      profissional: "",
      servico: "",
      nota: "",
      comentario: "",
      data: "",
    });
  }, [avaliacao, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica para criar/editar avaliação (chamar service)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {avaliacao ? "Detalhes da Avaliação" : "Nova Avaliação"}
        </h2>
        <FormInput
          label="Cliente"
          name="cliente_nome"
          value={form.cliente_nome}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Profissional"
          name="profissional"
          value={form.profissional}
          onChange={handleChange}
        />
        <FormInput
          label="Serviço"
          name="servico"
          value={form.servico}
          onChange={handleChange}
        />
        <FormInput
          label="Nota"
          name="nota"
          type="number"
          value={form.nota}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Comentário"
          name="comentario"
          value={form.comentario}
          onChange={handleChange}
        />
        <FormInput
          label="Data"
          name="data"
          type="date"
          value={form.data}
          onChange={handleChange}
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setOpen(false)}
          >
            Fechar
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
