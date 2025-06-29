import React from 'react';

export default function HomePage() {
  const usuario = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">Bem-vindo, {usuario.nome || 'Usuário'}!</h2>
      <div className="mt-4 space-y-2">
        <p>Aqui você pode acessar seus agendamentos, vendas, relatórios e muito mais.</p>
        {/* Adicione componentes de resumo se quiser */}
      </div>
    </div>
  );
}
