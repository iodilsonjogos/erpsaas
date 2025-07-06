import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar ou editar campanha de marketing.
 * Props: open (boolean), setOpen (função), campanha (objeto ou null)
 */
export default function MarketingModal({ open, setOpen, campanha }) {
  const [form, setForm] = useState({
    titulo: "",
    mensagem: "",
    publico: "Clientes",
    canal: "WhatsApp",
    programada_para: "",
    status: "Agendada"
  });

  useEffect(() => {
    if (campanha) setForm(campanha);
    else setForm({
      titulo: "",
      mensagem: "",
      publico: "Clientes",
      canal: "WhatsApp",
      programada_para: "",
      status: "Agendada"
    });
  }, [campanha, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de salvar/editar campanha (chamar service)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {campanha ? "Editar Campanha" : "Nova Campanha"}
        </h2>
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
        <div className="mb-3">
          <label className="block mb-1">Público</label>
          <select
            className="w-full border rounded p-2"
            name="publico"
            value={form.publico}
            onChange={handleChange}
          >
            <option value="Clientes">Clientes</option>
            <option value="Profissionais">Profissionais</option>
            <option value="Todos">Todos</option>
          </select>
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
          </select>
        </div>
        <FormInput
          label="Agendada para"
          name="programada_para"
          type="datetime-local"
          value={form.programada_para}
          onChange={handleChange}
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
            <option value="Agendada">Agendada</option>
            <option value="Enviada">Enviada</option>
            <option value="Cancelada">Cancelada</option>
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
