import React, { useState, useEffect } from "react";

/**
 * Permissão por módulo do sistema. Exemplo de módulos: clientes, agenda, financeiro, dashboard, etc.
 * Você pode customizar esses módulos/ações conforme o backend.
 */
const MODULOS = [
  "dashboard", "clientes", "profissionais", "agenda",
  "vendas", "produtos", "servicos", "financeiro",
  "relatorios", "configuracoes", "logs", "marketing"
];
const ACOES = ["visualizar", "criar", "editar", "excluir"];

export default function PermissaoModal({ open, setOpen, perfil, permissoes, onSave }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(permissoes || {});
  }, [permissoes, open]);

  if (!open) return null;

  function handleChange(modulo, acao) {
    setForm((prev) => {
      const modPerms = new Set(prev[modulo] || []);
      if (modPerms.has(acao)) modPerms.delete(acao);
      else modPerms.add(acao);
      return { ...prev, [modulo]: Array.from(modPerms) };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form className="bg-white p-8 rounded-2xl shadow-xl min-w-[340px] max-w-xl" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-3">Editar Permissões do perfil <span className="text-blue-700">{perfil}</span></h2>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead>
              <tr>
                <th className="p-2 border">Módulo</th>
                {ACOES.map((a, i) => (
                  <th key={i} className="p-2 border capitalize">{a}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODULOS.map((modulo) => (
                <tr key={modulo}>
                  <td className="p-2 border font-bold">{modulo}</td>
                  {ACOES.map((acao) => (
                    <td className="p-2 border text-center" key={acao}>
                      <input
                        type="checkbox"
                        checked={form[modulo]?.includes(acao) || false}
                        onChange={() => handleChange(modulo, acao)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setOpen(false)}>
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
