import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar ou editar permissões.
 * Props: open (boolean), setOpen (função), permissao (objeto ou null)
 */
export default function PermissoesModal({ open, setOpen, permissao }) {
  const [form, setForm] = useState({
    perfil: "operador",
    modulo: "agenda",
    pode_listar: true,
    pode_criar: true,
    pode_editar: true,
    pode_excluir: false,
  });

  useEffect(() => {
    if (permissao) setForm(permissao);
    else setForm({
      perfil: "operador",
      modulo: "agenda",
      pode_listar: true,
      pode_criar: true,
      pode_editar: true,
      pode_excluir: false,
    });
  }, [permissao, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de salvar/editar permissão (chamar service)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {permissao ? "Editar Permissão" : "Nova Permissão"}
        </h2>
        <div className="mb-3">
          <label className="block mb-1">Perfil</label>
          <select
            className="w-full border rounded p-2"
            name="perfil"
            value={form.perfil}
            onChange={handleChange}
          >
            <option value="admin">Administrador</option>
            <option value="operador">Operador</option>
            <option value="profissional">Profissional</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1">Módulo</label>
          <select
            className="w-full border rounded p-2"
            name="modulo"
            value={form.modulo}
            onChange={handleChange}
          >
            <option value="dashboard">Dashboard</option>
            <option value="agenda">Agenda</option>
            <option value="clientes">Clientes</option>
            <option value="profissionais">Profissionais</option>
            <option value="servicos">Serviços</option>
            <option value="produtos">Produtos</option>
            <option value="financeiro">Financeiro</option>
            <option value="relatorios">Relatórios</option>
            <option value="configuracoes">Configurações</option>
          </select>
        </div>
        <div className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="pode_listar"
            checked={form.pode_listar}
            onChange={handleChange}
            id="pode_listar"
          />
          <label htmlFor="pode_listar">Pode Listar</label>
        </div>
        <div className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="pode_criar"
            checked={form.pode_criar}
            onChange={handleChange}
            id="pode_criar"
          />
          <label htmlFor="pode_criar">Pode Criar</label>
        </div>
        <div className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="pode_editar"
            checked={form.pode_editar}
            onChange={handleChange}
            id="pode_editar"
          />
          <label htmlFor="pode_editar">Pode Editar</label>
        </div>
        <div className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="pode_excluir"
            checked={form.pode_excluir}
            onChange={handleChange}
            id="pode_excluir"
          />
          <label htmlFor="pode_excluir">Pode Excluir</label>
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
