function inicializarFullCalendar() {
    var calendarEl = document.getElementById('fullcalendar');
    if (!calendarEl) return;

    // Destrói se já existir (ex: navegação SPA)
    if (window.myCalendar) {
        window.myCalendar.destroy();
        window.myCalendar = null;
    }

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
            const dataAtual = info.start;
            if (typeof montarMiniCalendario === "function") {
                montarMiniCalendario(dataAtual.getMonth(), dataAtual.getFullYear());
            }
        },
        dayCellClassNames: function(arg) {
            if (arg.date.getDay() === 0) return ['domingo'];
            return [];
        },
        dayHeaderContent: function(arg) {
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
            if (typeof abrirModalAgendamento === "function") {
                abrirModalAgendamento(info.dateStr);
            }
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
        events: 'includes/api_agendamentos.php'
    });

    window.myCalendar.render();

    // Sincronização com mini calendário
    if (typeof setMiniCalendarioSync === "function") {
        setMiniCalendarioSync(function(ano, mes, dia) {
            let date = new Date(ano, mes, dia || 1);
            window.myCalendar.gotoDate(date);
        });
    }

    // Sincronização botão Hoje
    if (typeof setMiniCalendarioHoje === "function") {
        setMiniCalendarioHoje(function() {
            window.myCalendar.today();
        });
    }
}

// Bloco para rodar ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    inicializarFullCalendar();

    // Montar mini calendário inicial (opcional, se quiser já aparecer na home)
    const hoje = new Date();
    if (typeof montarMiniCalendario === "function") {
        montarMiniCalendario(hoje.getMonth(), hoje.getFullYear());
    }
});
