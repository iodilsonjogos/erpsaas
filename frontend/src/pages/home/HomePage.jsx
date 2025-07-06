import React, { useState } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import HomeModal from './HomeModal';

export default function HomePage() {
  const usuario = JSON.parse(localStorage.getItem('user') || '{}');
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="max-w-3xl mx-auto p-6">
          <h2 className="text-2xl font-bold mb-2">Bem-vindo, {usuario.nome || 'Usuário'}!</h2>
          <div className="mt-4 space-y-2">
            <p>Aqui você pode acessar seus agendamentos, vendas, relatórios e muito mais.</p>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              Ver Avisos
            </button>
          </div>
          <HomeModal open={showModal} setOpen={setShowModal} />
        </main>
      </div>
    </div>
  );
}
