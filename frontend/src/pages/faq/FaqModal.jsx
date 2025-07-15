import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarFaq, editarFaq } from "./faqService";

export default function FaqModal({ open, setOpen, faq, onRefresh }) {
  const [form, setForm] = useState({
    pergunta: "",
    resposta: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (faq) setForm(faq);
    else setForm({ pergunta: "", resposta: "" });
  }, [faq, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (faq && faq.id) {
        await editarFaq(faq.id, form);
      } else {
        await criarFaq(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar FAQ!");
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
          {faq ? "Editar Pergunta" : "Nova Pergunta"}
        </h2>
        <FormInput
          label="Pergunta"
          name="pergunta"
          value={form.pergunta || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Resposta"
          name="resposta"
          value={form.resposta || ""}
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
