import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import FaqModal from "./FaqModal";
import { getFaqs } from "./faqService";

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [faqEdit, setFaqEdit] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getFaqs();
      setFaqs(data);
    }
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">FAQ - Perguntas Frequentes</h1>
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
          <div className="space-y-3">
            {faqs.length === 0 && (
              <div className="text-gray-400">Nenhuma FAQ cadastrada ainda.</div>
            )}
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-bold">{faq.pergunta}</div>
                  <div className="text-gray-600 text-sm">{faq.resposta}</div>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setFaqEdit(faq);
                      setShowModal(true);
                    }}
                  >
                    Editar
                  </button>
                  <button className="text-red-600 hover:underline">Excluir</button>
                </div>
              </div>
            ))}
          </div>
          <FaqModal
            open={showModal}
            setOpen={setShowModal}
            faq={faqEdit}
          />
        </main>
      </div>
    </div>
  );
}
