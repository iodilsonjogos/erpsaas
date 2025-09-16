// === Arquivo: src/pages/agenda/AgendaFullCalendar.jsx ===

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { getAgendamentosDia } from "../home/homeService";
import AgendaModal from "./AgendaModal"; // ✅ Integra o modal de agendamento existente
import "./agenda.css";

function AgendaFullCalendar({ dataSelecionada, profissionalSelecionado, onRefresh }) {
  const [eventos, setEventos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [dataClicada, setDataClicada] = useState(null);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);

  useEffect(() => {
    const buscar = async () => {
      const data = dataSelecionada.toISOString().split("T")[0];
      const resposta = await getAgendamentosDia(data);
      const eventosFiltrados = profissionalSelecionado
        ? resposta.filter(e => e.profissional_id === profissionalSelecionado)
        : resposta;
      const eventosMapeados = eventosFiltrados.map(e => ({
        id: e.id,
        title: `${e.nome_cliente} - ${e.nome_servico}`,
        start: `${e.data}T${e.hora}`,
        extendedProps: { ...e },
        color: "#4B9CD3" // Exemplo: pode mudar por profissional ou tipo
      }));
      setEventos(eventosMapeados);
    };
    buscar();
  }, [dataSelecionada, profissionalSelecionado, modalAberto]);

  const handleDateClick = (arg) => {
    setDataClicada(arg.date);
    setAgendamentoSelecionado(null); // Novo agendamento
    setModalAberto(true);
  };

  const handleEventClick = (arg) => {
    setDataClicada(new Date(arg.event.start));
    setAgendamentoSelecionado(arg.event.extendedProps);
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setAgendamentoSelecionado(null);
    setDataClicada(null);
  };

  return (
    <div className="agenda-full-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        locale={ptBrLocale}
        allDaySlot={false}
        headerToolbar={{
          left: "today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        buttonText={{
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
        }}
        dayHeaderFormat={{ weekday: "short" }}
        events={eventos}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
      />

      {modalAberto && (
        <AgendaModal
          open={modalAberto}
          onClose={handleFecharModal}
          dataInicial={dataClicada}
          dadosIniciais={agendamentoSelecionado} // ✅ Passa dados ao editar
          onRefresh={onRefresh}
          modoEdicao={!!agendamentoSelecionado} // ✅ Informa se é edição
        />
      )}
    </div>
  );
}

export default AgendaFullCalendar;
