// src/pages/onboarding/WelcomeOnboarding.jsx
export default function WelcomeOnboarding({ nomeEmpresa }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg text-center">
        <img src="/logo.svg" className="mx-auto mb-4 w-24" />
        <h1 className="text-2xl font-bold mb-2">Bem-vindo, {nomeEmpresa || "novo usuário"}!</h1>
        <p className="mb-4 text-gray-700">Seu ERP está quase pronto. Complete seu perfil para começar a usar todas as funcionalidades.</p>
        {/* Aqui você pode colocar um componente para upload de logo, checklist, etc */}
        <button className="bg-blue-600 text-white rounded-lg px-8 py-3 mt-4 font-bold">Acessar o sistema</button>
      </div>
    </div>
  );
}
