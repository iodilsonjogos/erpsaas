import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarCampanha, editarCampanha } from "./marketingService";

export default function MarketingModal({ open, setOpen, campanha, onRefresh }) {
  const [form, setForm] = useState({
    titulo: "",
    tipo: "E-mail",
    publico: "",
    mensagem: "",
    data_envio: "",
    status: "Agendada"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (campanha)
      setForm({
        ...campanha,
        data_envio: campanha.data_envio ? campanha.data_envio.split("T")[0] : ""
      });
    else setForm({
      titulo: "",
      tipo: "E-mail",
      publico: "",
      mensagem: "",
      data_envio: "",
      status: "Agendada"
    });
  }, [campanha, open]);

  if (!open) return null;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (campanha && campanha.id) {
        await editarCampanha(campanha.id, form);
      } else {
        await criarCampanha(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar campanha!");
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
          {campanha ? "Editar Campanha" : "Nova Campanha"}
        </h2>
        <FormInput
          label="Título"
          name="titulo"
          value={form.titulo || ""}
          onChange={handleChange}
          required
        />
        <div className="mb-3">
          <label className="block mb-1">Tipo</label>
          <select className="w-full border rounded p-2" name="tipo" value={form.tipo} onChange={handleChange}>
            <option value="E-mail">E-mail</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="SMS">SMS</option>
            <option value="Push">Push</option>
          </select>
        </div>
        <FormInput
          label="Público Alvo"
          name="publico"
          value={form.publico || ""}
          onChange={handleChange}
          required
          placeholder="Todos, Clientes, Profissionais, etc"
        />
        <div className="mb-3">
          <label className="block mb-1">Mensagem</label>
          <textarea
            className="w-full border rounded p-2"
            name="mensagem"
            value={form.mensagem || ""}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>
        <FormInput
          label="Data de Envio"
          name="data_envio"
          type="date"
          value={form.data_envio || ""}
          onChange={handleChange}
        />
        <FormInput
          label="Status"
          name="status"
          value={form.status || ""}
          onChange={handleChange}
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
