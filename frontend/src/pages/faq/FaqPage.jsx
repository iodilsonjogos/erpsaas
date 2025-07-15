import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import FaqModal from "./FaqModal";
import { getFaqs, excluirFaq } from "./faqService";

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [faqEdit, setFaqEdit] = useState(null);

  async function loadFaqs() {
    const data = await getFaqs();
    setFaqs(data);
  }

  useEffect(() => {
    loadFaqs();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="max-w-3xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Perguntas Frequentes (FAQ)</h1>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              onClick={() => {
                setFaqEdit(null);
                setShowModal(true);
              }}
            >
              Nova Pergunta
            </button>
          </div>
          <div className="space-y-4">
            {faqs.length === 0 && (
              <div className="text-gray-400">Nenhuma pergunta cadastrada.</div>
            )}
            {faqs.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-4">
                <div className="font-semibold text-blue-700 flex items-center">
                  <span className="mr-2">{idx + 1}.</span> {item.pergunta}
                </div>
                <div className="text-gray-600 mt-2">{item.resposta}</div>
                <div className="flex gap-2 mt-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setFaqEdit(item);
                      setShowModal(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={async () => {
                      if (window.confirm("Confirma exclusão?")) {
                        await excluirFaq(item.id);
                        loadFaqs();
                      }
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
          <FaqModal
            open={showModal}
            setOpen={setShowModal}
            faq={faqEdit}
            onRefresh={loadFaqs}
          />
        </main>
      </div>
    </div>
  );
}
