import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (usuario.perfil !== 'admin') navigate('/home');
  }, [usuario, navigate]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard (Administrativo)</h2>
      {/* Adicione cards, gráficos, contadores, etc */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="font-bold text-xl">Total de Clientes</div>
          <div className="text-3xl">...</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="font-bold text-xl">Receita no mês</div>
          <div className="text-3xl">...</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="font-bold text-xl">Próximos Agendamentos</div>
          <div className="text-3xl">...</div>
        </div>
      </div>
    </div>
  );
}
