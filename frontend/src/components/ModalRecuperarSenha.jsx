import React, { useState } from 'react';

export default function ModalRecuperarSenha({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
        <button className="absolute top-2 right-4 text-2xl" onClick={onClose}>×</button>
        {!enviado ? (
          <>
            <h2 className="text-xl font-bold mb-4">Recuperar senha</h2>
            <form onSubmit={handleSubmit}>
              <input
                className="w-full border rounded-lg p-3 mb-4"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="w-full bg-blue-600 text-white rounded-lg p-3 font-bold hover:bg-blue-700">Enviar link de recuperação</button>
            </form>
          </>
        ) : (
          <div>
            <h2 className="text-lg font-bold mb-2">Verifique seu e-mail</h2>
            <p>Se o e-mail informado existir em nosso sistema, você receberá um link para redefinir sua senha.</p>
            <button className="mt-4 bg-blue-600 text-white rounded-lg px-4 py-2" onClick={onClose}>Fechar</button>
          </div>
        )}
      </div>
    </div>
  );
}
