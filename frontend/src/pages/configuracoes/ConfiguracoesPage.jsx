import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import ConfiguracoesModal from "./ConfiguracoesModal";
import { getConfiguracoes } from "./configuracoesService";

export default function ConfiguracoesPage() {
  const [config, setConfig] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getConfiguracoes();
      setConfig(data);
    }
    fetchData();
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
            setConfig={setConfig}
          />
        </main>
      </div>
    </div>
  );
}
