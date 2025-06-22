document.addEventListener('DOMContentLoaded', function() {
    const hoje = new Date();
    montarMiniCalendario(hoje.getMonth(), hoje.getFullYear());
    var calendarEl = document.getElementById('fullcalendar');
        events: 'includes/api_agendamentos.php',
    window.myCalendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        allDaySlot: false,
        locale: 'pt-br',
        buttonText: {
            today:    'Hoje',
            month:    'Mês',
            week:     'Semana',
            day:      'Dia',
            list:     'Lista'
        },
        headerToolbar: {
            left: 'today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,dayGridMonth'
        },
        slotMinTime: '08:00:00',
        slotMaxTime: '20:00:00',
        height: 'auto',
        contentHeight: 'auto',
        slotLabelFormat: {
            hour: '2-digit', minute: '2-digit', hour12: false
        },
        datesSet: function(info) {
        // Toda vez que o FullCalendar muda de data/visualização, roda isso!
        const dataAtual = info.start; // ou info.view.currentStart
        montarMiniCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
        },
        dayCellClassNames: function(arg) {
        if (arg.date.getDay() === 0) return ['domingo'];
        return [];
        },
        dayHeaderContent: function(arg) {
            // Personaliza cabeçalho do calendário
            const dias = ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'];
            const root = document.createElement('div');
            root.style.display = 'flex';
            root.style.flexDirection = 'column';
            root.style.alignItems = 'center';
            const label = document.createElement('span');
            label.textContent = dias[arg.date.getDay()];
            label.style.fontWeight = '400';
            label.style.fontSize = '1em';
            const numero = document.createElement('span');
            numero.textContent = arg.date.getDate();
            numero.style.fontWeight = '500';
            numero.style.fontSize = '1.15em';
            root.appendChild(label);
            root.appendChild(numero);
            return { domNodes: [root] };
        },
        dateClick: function(info) {
            abrirModalAgendamento(info.dateStr);
            let campoData = document.getElementById('dataAgendamento');
            let campoHora = document.getElementById('horaAgendamento');
            if (campoData) {
                if (info.dateStr.length > 10) {
                    campoData.value = info.dateStr.slice(0, 10);
                    if (campoHora) campoHora.value = info.dateStr.slice(11, 16);
                } else {
                    campoData.value = info.dateStr;
                    if (campoHora) campoHora.value = "";
                }
            }
        },

    });
    window.myCalendar.render();
});
