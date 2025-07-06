import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";

/**
 * Modal para criar ou editar usuário.
 * Props: open (boolean), setOpen (função), usuario (objeto ou null)
 */
export default function UsuariosModal({ open, setOpen, usuario }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    perfil: "operador",
    ativo: true,
  });

  useEffect(() => {
    if (usuario) setForm({ ...usuario, senha: "" });
    else setForm({ nome: "", email: "", senha: "", perfil: "operador", ativo: true });
  }, [usuario, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aqui vai lógica de salvar ou editar (chamar serviço)
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">
          {usuario ? "Editar Usuário" : "Novo Usuário"}
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
          required
        />
        <FormInput
          label="Senha"
          name="senha"
          type="password"
          value={form.senha}
          onChange={handleChange}
          required={!usuario}
        />
        <div className="mb-3">
          <label className="block mb-1">Perfil</label>
          <select
            className="w-full border rounded p-2"
            name="perfil"
            value={form.perfil}
            onChange={handleChange}
            required
          >
            <option value="admin">Administrador</option>
            <option value="operador">Operador</option>
            <option value="profissional">Profissional</option>
            <option value="cliente">Cliente</option>
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
