import React from "react";

export default function Header() {
  // Substitua "Nome da Empresa" por valor dinâmico do contexto ou user
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold text-blue-700">Nome da Empresa</span>
        {/* Você pode colocar aqui o nome da página atual, se desejar */}
      </div>
      <div className="flex items-center gap-4">
        {/* Adicione aqui botões de notificações, tema, perfil etc */}
        <button className="p-2 rounded hover:bg-blue-50">🔔</button>
        <button className="p-2 rounded hover:bg-blue-50">👤</button>
      </div>
    </header>
  );
}
