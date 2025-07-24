import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import ConfiguracoesModal from "./ConfiguracoesModal";
import { getConfiguracoes } from "./configuracoesService";
import { useState, useEffect } from "react";

const temas = [
  { value: "theme-default", label: "Empresarial (Conforto Visual)" },
  { value: "theme-feminino", label: "Feminino/Estética (Rosa, Verde, Azul Piscina)" },
  { value: "theme-barbershop", label: "Barber Shop (Azul, Vermelho, Preto, Branco)" }
];

export default function ConfiguracoesEmpresa() {
  const [tema, setTema] = useState(localStorage.getItem("theme") || "theme-default");

  useEffect(() => {
    document.body.className = tema;
  }, [tema]);

  function handleChange(e) {
    setTema(e.target.value);
    localStorage.setItem("theme", e.target.value);
    // Aqui você pode chamar uma API para salvar o tema no backend, se desejar
    // await empresaService.atualizarTema(e.target.value);
  }

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">Tema visual do sistema</h4>
      <div className="mb-3">
        <label className="form-label">Escolha o tema visual:</label>
        <select className="form-select" value={tema} onChange={handleChange}>
          {temas.map(t => <option value={t.value} key={t.value}>{t.label}</option>)}
        </select>
      </div>
      <div>
        <span className="badge bg-primary me-2">Exemplo cor primária</span>
        <span className="badge bg-secondary me-2">Cor secundária</span>
        <span className="badge bg-success">Destaque</span>
      </div>
    </div>
  );
}

export default function ConfiguracoesPage() {
  const [config, setConfig] = useState(null);
  const [showModal, setShowModal] = useState(false);

  async function reloadConfig() {
    const data = await getConfiguracoes();
    setConfig(data);
  }

  useEffect(() => {
    reloadConfig();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Configurações da Empresa</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => setShowModal(true)}
            >
              Editar Configuração
            </button>
          </div>
          {config ? (
            <div className="bg-white rounded-xl shadow p-6 space-y-2">
              <div><strong>Nome:</strong> {config.nome}</div>
              <div><strong>CNPJ:</strong> {config.cnpj}</div>
              <div><strong>Email:</strong> {config.email}</div>
              <div><strong>Telefone:</strong> {config.telefone}</div>
              <div><strong>Endereço:</strong> {config.endereco}</div>
              <div><strong>Confirmação de Agendamento:</strong> {config.confirmacao_agendamento}</div>
              <div><strong>Permite Upsell:</strong> {config.permite_upsell ? "Sim" : "Não"}</div>
              <div><strong>Confirmação da Baixa:</strong> {config.confirmacao_baixa}</div>
              <div><strong>Tipo de Comissão:</strong> {config.tipo_comissao}</div>
              <div><strong>Valor Comissão (%):</strong> {config.valor_comissao}</div>
            </div>
          ) : (
            <div className="text-gray-500">Carregando configurações...</div>
          )}
          <ConfiguracoesModal
            open={showModal}
            setOpen={setShowModal}
            config={config}
            setConfig={(novo) => { setConfig(novo); reloadConfig(); }}
          />
        </main>
      </div>
    </div>
  );
}
