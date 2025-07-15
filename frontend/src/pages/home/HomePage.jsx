import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import HomeModal from "./HomeModal";
import { getResumoHome, getProximosAtendimentos } from "./homeService";
import TableGeneric from "../../components/TableGeneric";

export default function HomePage() {
  const [resumo, setResumo] = useState({});
  const [proximos, setProximos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitulo, setModalTitulo] = useState("");

  useEffect(() => {
    async function fetchData() {
      setResumo(await getResumoHome());
      setProximos(await getProximosAtendimentos());
    }
    fetchData();
  }, []);

  function verDetalhesAgenda() {
    setModalTitulo("Próximos Atendimentos");
    setModalContent(
      <TableGeneric
        colunas={[
          { key: "data", label: "Data" },
          { key: "hora", label: "Hora" },
          { key: "cliente", label: "Cliente" },
          { key: "servico", label: "Serviço" },
        ]}
        dados={proximos}
        vazio="Nenhum agendamento futuro."
      />
    );
    setShowModal(true);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">Bem-vindo ao Sistema!</h1>
          {/* Cards principais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ResumoCard
              label="Agendamentos de Hoje"
              valor={resumo.agenda_hoje || 0}
              onDetalhes={verDetalhesAgenda}
            />
            <ResumoCard
              label="Meus Clientes"
              valor={resumo.total_clientes || 0}
            />
            <ResumoCard
              label="Meus Serviços"
              valor={resumo.total_servicos || 0}
            />
          </div>
          <HomeModal open={showModal} setOpen={setShowModal} titulo={modalTitulo}>
            {modalContent}
          </HomeModal>
        </main>
      </div>
    </div>
  );
}

function ResumoCard({ label, valor, onDetalhes }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center relative group">
      <div className="text-3xl font-bold">{valor}</div>
      <div className="text-sm mt-2 text-gray-500">{label}</div>
      {onDetalhes && (
        <button
          className="absolute right-3 top-3 text-blue-600 opacity-0 group-hover:opacity-100 transition"
          onClick={onDetalhes}
        >
          <span className="underline">Detalhes</span>
        </button>
      )}
    </div>
  );
}
