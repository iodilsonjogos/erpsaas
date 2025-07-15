import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { criarUsuario, editarUsuario } from "./usuariosService";

const PERFIS = ["admin", "operador", "cliente"];

export default function UsuariosModal({ open, setOpen, usuario, onRefresh }) {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    perfil: "operador",
    status: true
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (usuario) setForm({ ...usuario, senha: "" });
    else setForm({ nome: "", email: "", senha: "", perfil: "operador", status: true });
  }, [usuario, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (usuario && usuario.id) {
        // Editar não obriga alterar senha
        const payload = { ...form };
        if (!payload.senha) delete payload.senha;
        await editarUsuario(usuario.id, payload);
      } else {
        await criarUsuario(form);
      }
      if (onRefresh) onRefresh();
      setOpen(false);
    } catch {
      alert("Erro ao salvar usuário!");
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
          {usuario ? "Editar Usuário" : "Novo Usuário"}
        </h2>
        <FormInput
          label="Nome"
          name="nome"
          value={form.nome || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={form.email || ""}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Senha"
          name="senha"
          type="password"
          value={form.senha || ""}
          onChange={handleChange}
          required={!usuario}
          placeholder={usuario ? "Deixe em branco para não alterar" : ""}
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
            {PERFIS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="mb-3 flex items-center gap-2">
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={handleChange}
            id="status"
          />
          <label htmlFor="status">Ativo</label>
        </div>
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
