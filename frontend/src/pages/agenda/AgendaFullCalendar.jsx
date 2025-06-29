import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';

export default function AgendaFullCalendar() {
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get(process.env.REACT_APP_API_URL + '/agenda', { headers });
      // Busca nomes dos clientes e profissionais
      const [clientesRes, profissionaisRes] = await Promise.all([
        axios.get(process.env.REACT_APP_API_URL + '/clientes', { headers }),
        axios.get(process.env.REACT_APP_API_URL + '/profissionais', { headers })
      ]);
      const clientesMap = {};
      const profsMap = {};
      clientesRes.data.forEach(c => { clientesMap[c.id] = c.nome; });
      profissionaisRes.data.forEach(p => { profsMap[p.id] = p.nome; });

      const eventos = res.data.map(a => ({
        id: a.id,
        title: `${a.servico} - ${clientesMap[a.cliente_id] || 'Cliente'} (${profsMap[a.profissional_id] || 'Profissional'})`,
        start: `${a.data}T${a.hora}`,
        allDay: false
      }));
      setAgendas(eventos);
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={agendas}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        height={650}
      />
    </div>
  );
}