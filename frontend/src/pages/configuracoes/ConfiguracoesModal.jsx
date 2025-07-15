import React, { useState, useEffect } from "react";
import FormInput from "../../components/FormInput";
import { salvarConfiguracoes } from "./configuracoesService";

/**
 * Modal para editar as configurações da empresa.
 * Props: open, setOpen, config, setConfig
 */
export default function ConfiguracoesModal({ open, setOpen, config, setConfig }) {
  const [form, setForm] = useState({
    nome: "",
    cnpj: "",
    email: "",
    telefone: "",
    endereco: "",
    confirmacao_agendamento: "manual",
    permite_upsell: true,
    confirmacao_baixa: "recepcao",
    tipo_comissao: "percentual",
    valor_comissao: "10.00"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (config) setForm(config);
  }, [config, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await salvarConfiguracoes(form); // Atualiza no backend!
      setConfig(form); // Atualiza visual no frontend
      setOpen(false);
    } catch {
      alert("Erro ao salvar configurações!");
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form
        className="bg-white p-6 rounded-xl shadow-lg min-w-[340px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-lg font-bold mb-3">Editar Configurações</h2>
        <FormInput label="Nome" name="nome" value={form.nome} onChange={handleChange} required />
        <FormInput label="CNPJ" name="cnpj" value={form.cnpj} onChange={handleChange} required />
        <FormInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <FormInput label="Telefone" name="telefone" value={form.telefone} onChange={handleChange} />
        <FormInput label="Endereço" name="endereco" value={form.endereco} onChange={handleChange} />

        <div className="mb-3">
          <label className="block mb-1">Confirmação de Agendamento</label>
          <select className="w-full border rounded p-2" name="confirmacao_agendamento" value={form.confirmacao_agendamento} onChange={handleChange}>
            <option value="manual">Manual</option>
            <option value="automatica">Automática</option>
          </select>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <input type="checkbox" name="permite_upsell" checked={form.permite_upsell} onChange={handleChange} id="permite_upsell" />
          <label htmlFor="permite_upsell">Permite Upsell</label>
        </div>

        <div className="mb-3">
          <label className="block mb-1">Confirmação da Baixa</label>
          <select className="w-full border rounded p-2" name="confirmacao_baixa" value={form.confirmacao_baixa} onChange={handleChange}>
            <option value="profissional">Profissional</option>
            <option value="recepcao">Recepção</option>
            <option value="ambos">Ambos</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block mb-1">Tipo de Comissão</label>
          <select className="w-full border rounded p-2" name="tipo_comissao" value={form.tipo_comissao} onChange={handleChange}>
            <option value="fixa">Fixa</option>
            <option value="percentual">Percentual</option>
          </select>
        </div>
        <FormInput label="Valor Comissão (%)" name="valor_comissao" type="number" value={form.valor_comissao} onChange={handleChange} />

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setOpen(false)}>
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}
