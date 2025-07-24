import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Importe seus serviços de upload e API de empresa

const segmentos = [
  "Barbearia", "Salão de Beleza", "Esmalteria", "Manicure", "Clínica de Estética",
  "Cabeleireiro", "Depilação", "Maquiagem", "Terapias Holísticas", "Personal Trainer",
  "Consultoria de Estilo", "Oficina Mecânica", "Quiropraxia", "Pet Shop", "Consultoria", "Outros"
];
const temas = [
  { nome: "Azul", valor: "azul", cor: "#236aff" },
  { nome: "Verde", valor: "verde", cor: "#18c56b" },
  { nome: "Roxo", valor: "roxo", cor: "#835afd" }
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [logo, setLogo] = useState(null);
  const [segmento, setSegmento] = useState("");
  const [tema, setTema] = useState("");
  const [progresso, setProgresso] = useState(33);

  // Simula envio do logo
  const handleLogoUpload = e => {
    setLogo(e.target.files[0]);
    setProgresso(50);
    setStep(2);
  };

  const handleEscolherSegmento = e => {
    setSegmento(e.target.value);
    setProgresso(75);
    setStep(3);
  };

  const handleEscolherTema = valor => {
    setTema(valor);
    setProgresso(100);
  };

  // Finalizar onboarding
  const handleFinalizar = async () => {
    // Aqui você pode enviar os dados para o backend, exemplo:
    // await empresaService.update({ logo, segmento, tema })
    // Após sucesso:
    // Redireciona para dashboard ou home
    navigate("/dashboard");
  };

  return (
    <div className="container py-5" style={{maxWidth: 520}}>
      <h2 className="mb-4">Configuração Inicial</h2>
      <div className="progress mb-4" style={{height: 12}}>
        <div className="progress-bar" role="progressbar"
          style={{width: `${progresso}%`}}
          aria-valuenow={progresso} aria-valuemin="0" aria-valuemax="100"
        />
      </div>
      {step === 1 && (
        <>
          <p><b>1. Envie a logo do seu negócio:</b></p>
          <input type="file" accept="image/*" onChange={handleLogoUpload} className="form-control mb-3" />
          {logo && <img src={URL.createObjectURL(logo)} alt="logo preview" className="mb-3" style={{maxWidth: 120}} />}
        </>
      )}
      {step === 2 && (
        <>
          <p><b>2. Qual o segmento do seu negócio?</b></p>
          <select className="form-select mb-3" value={segmento} onChange={handleEscolherSegmento}>
            <option value="">Selecione…</option>
            {segmentos.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </>
      )}
      {step === 3 && (
        <>
          <p><b>3. Escolha um tema para o sistema:</b></p>
          <div className="d-flex gap-3 mb-4">
            {temas.map(t => (
              <button type="button" key={t.valor}
                className={`btn ${tema === t.valor ? "btn-primary" : "btn-outline-primary"}`}
                style={{background: tema === t.valor ? t.cor : "", color: tema === t.valor ? "#fff" : "#222"}}
                onClick={() => handleEscolherTema(t.valor)}>
                {t.nome}
              </button>
            ))}
          </div>
          <button className="btn btn-success" onClick={handleFinalizar} disabled={!tema}>
            Finalizar e acessar sistema
          </button>
        </>
      )}
    </div>
  );
}
