import { useEffect, useState } from "react";
import { uploadLogo } from "../services/empresaService"; // caminho correto!
import { getProgresso, concluirPasso } from "../services/onboardingService";

export default function OnboardingModal({ open, onClose, userName = "", onFinish }) {
  const [step, setStep] = useState(0);
  const [logo, setLogo] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [progresso, setProgresso] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (open) {
      getProgresso(token).then(setProgresso).catch(() => setProgresso([]));
    }
  }, [open, token]);

  async function marcarPassoConcluido(passo) {
    await concluirPasso(passo, token);
    setProgresso(old => [...old, { passo, concluido: 1 }]);
  }

  const steps = [
    {
      title: "Bem-vindo!",
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-2">Bem-vindo{userName ? `, ${userName}` : ""}!</h2>
          <p className="text-gray-600 mb-6">Vamos configurar o seu sistema em poucos passos.</p>
        </div>
      )
    },
    {
      title: "Envie sua logomarca",
      content: (
        <div>
          <label className="block mb-2 font-semibold">Logo da empresa ou negócio:</label>
          <input
            type="file"
            accept="image/*"
            onChange={e => setLogo(e.target.files[0])}
            className="block w-full mb-4"
          />
          {logo && (
            <img
              src={URL.createObjectURL(logo)}
              alt="Logo preview"
              className="h-24 mx-auto rounded shadow mb-4"
            />
          )}
          <button
            className="bg-blue-600 text-white rounded px-4 py-2 font-bold mt-2"
            type="button"
            disabled={!logo || uploadStatus === "Enviando..."}
            onClick={async () => {
              try {
                setUploadStatus("Enviando...");
                const token = localStorage.getItem("token");
                await uploadLogo(logo, token);
                setUploadStatus("Enviado com sucesso!");
              } catch (err) {
                setUploadStatus("Erro ao enviar logo");
              }
            }}
          >
            Enviar logo
          </button>
          {uploadStatus && <div className="mt-2 text-sm">{uploadStatus}</div>}
        </div>
      )
    },
    {
      title: "Checklist inicial",
      content: (
        <div>
          <ul className="list-disc ml-4 text-gray-700 mb-4">
            <li>✓ Complete seu perfil</li>
            <li>✓ Cadastre seus serviços/produtos</li>
            <li>✓ Adicione clientes e profissionais</li>
            <li>✓ Configure integrações</li>
          </ul>
          <p className="text-green-600 font-semibold">Tudo pronto! Você já pode usar o ERP.</p>
        </div>
      )
    }
  ];
 
  if (!open) return null;
 
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative flex flex-col items-center">
        {/* Barra de progresso/steps */}
        <div className="flex w-full justify-between mb-6">
          {steps.map((s, idx) => (
            <div key={s.title} className="flex-1 flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
                ${idx <= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-400"}
              `}>
                {idx + 1}
              </div>
              <span className={`mt-1 text-xs text-center ${idx === step ? "text-blue-700" : "text-gray-400"}`}>{s.title}</span>
              {idx < steps.length - 1 && <div className="w-full h-1 bg-gray-200 my-1" />}
            </div>
          ))}
        </div>
        {/* Conteúdo do step atual */}
        <div className="w-full text-center mb-6">{steps[step].content}</div>
        {/* Botões navegação */}
        <div className="flex gap-4">
          {step > 0 && (
            <button
              className="bg-gray-200 text-gray-700 rounded px-5 py-2 font-semibold"
              onClick={() => setStep(step - 1)}
            >
              Voltar
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              className="bg-blue-600 text-white rounded px-5 py-2 font-semibold hover:bg-blue-700"
              onClick={() => setStep(step + 1)}
            >
              Avançar
            </button>
          ) : (
            <button
              className="bg-emerald-500 text-white rounded px-5 py-2 font-semibold hover:bg-emerald-600"
              onClick={() => {
                if (onFinish) onFinish();
                if (onClose) onClose();
              }}
            >
              Finalizar
            </button>
          )}
        </div>
        <button className="absolute top-2 right-4 text-2xl text-gray-400" onClick={onClose}>×</button>
      </div>
    </div>
  );
}
