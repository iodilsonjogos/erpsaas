// index.js

// MENU LATERAL RETRÁTIL
const toggleBtn = document.getElementById('toggle-menu');
const menuLateral = document.getElementById('menuLateral');
const mainContent = document.getElementById('conteudoPrincipal');
if (toggleBtn && menuLateral) {
    toggleBtn.addEventListener('click', () => {
        menuLateral.classList.toggle('recolhido');
        mainContent.style.marginLeft = menuLateral.classList.contains('recolhido') ? '70px' : '220px';
        if (window.myCalendar && typeof window.myCalendar.updateSize === 'function') {
            setTimeout(() => window.myCalendar.updateSize(), 330);
            setTimeout(() => window.myCalendar.updateSize(), 290);
        }
    });
}

// POPOVER ATALHOS RÁPIDOS
const btnAcessoRapido = document.getElementById('btnAcessoRapido');
const popoverAtalhos = document.getElementById('popoverAtalhos');
if (btnAcessoRapido && popoverAtalhos) {
    btnAcessoRapido.onclick = function(e) {
        e.stopPropagation();
        const rect = btnAcessoRapido.getBoundingClientRect();
        popoverAtalhos.style.top = (rect.bottom + 5) + "px";
        popoverAtalhos.style.left = rect.left + "px";
        popoverAtalhos.classList.toggle('aberto');
    };
    document.addEventListener('click', () => popoverAtalhos.classList.remove('aberto'));
    popoverAtalhos.onclick = e => e.stopPropagation();
}

// MODAL DE CADASTRO RÁPIDO GLOBAL
const btnModalCadastroProfissional = document.getElementById('btnModalCadastroProfissional');
const modalCadastroProf = document.getElementById('modalCadastroProf');
const fecharModalCadastroProf = document.getElementById('fecharModalCadastroProf');
if (btnModalCadastroProfissional && modalCadastroProf && fecharModalCadastroProf) {
    btnModalCadastroProfissional.onclick = function(e) {
        e.stopPropagation();
        modalCadastroProf.style.display = 'flex';
        if (popoverAtalhos) popoverAtalhos.classList.remove('aberto');
        setTimeout(() => {
            const input = modalCadastroProf.querySelector('input[name="nome"]');
            if (input) input.focus();
        }, 100);
    };
    fecharModalCadastroProf.onclick = () => modalCadastroProf.style.display = 'none';
    modalCadastroProf.addEventListener('click', function(e) {
        if (e.target === modalCadastroProf) modalCadastroProf.style.display = 'none';
    });
}
// ========== MODAL DE AGENDAMENTO ==========
const modalAgendamento = document.getElementById('modalAgendamento');
const fecharModalAgendamento = document.getElementById('fecharModalAgendamento');
if (modalAgendamento && fecharModalAgendamento) {
    fecharModalAgendamento.onclick = () => modalAgendamento.style.display = 'none';
    modalAgendamento.addEventListener('click', (e) => {
        if (e.target === modalAgendamento) modalAgendamento.style.display = 'none';
    });
}
// FILA DE ESPERA (se for global)
const btnAddFila = document.getElementById('btnAddFila');
const nomeFila = document.getElementById('nomeFila');
const listaFila = document.getElementById('listaFila');
const feedbackFila = document.getElementById('feedbackFila');
let filaEspera = [];
function renderFilaEspera() {
    if (!listaFila) return;
    listaFila.innerHTML = '';
    if (filaEspera.length === 0) {
        listaFila.innerHTML = '<li>Nenhum cliente na fila.</li>';
        return;
    }
    filaEspera.forEach((nome, i) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${nome}</span>
            <button class="remover-fila" title="Remover da fila" onclick="removerFila(${i})">
                <i class="fas fa-times"></i>
            </button>
        `;
        listaFila.appendChild(li);
    });
}
window.removerFila = function(index) {
    filaEspera.splice(index, 1);
    renderFilaEspera();
};
function mostrarFeedback(mensagem) {
    if (!feedbackFila) return;
    feedbackFila.textContent = mensagem;
    feedbackFila.style.display = 'block';
    feedbackFila.style.opacity = 1;
    setTimeout(() => {
        feedbackFila.style.opacity = 0;
        setTimeout(() => {
            feedbackFila.style.display = 'none';
        }, 400);
    }, 1400);
}
if (btnAddFila && nomeFila) {
    btnAddFila.onclick = function() {
        const nome = nomeFila.value.trim();
        if (!nome) {
            mostrarFeedback('Digite o nome do cliente');
            return;
        }
        filaEspera.push(nome);
        nomeFila.value = '';
        renderFilaEspera();
        mostrarFeedback('Cliente adicionado!');
    };
    nomeFila.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') btnAddFila.click();
    });
}
renderFilaEspera();

// MINI CALENDÁRIO LATERAL (se for global)
document.addEventListener('DOMContentLoaded', function() {
    const hoje = new Date();
    montarMiniCalendario(hoje.getMonth(), hoje.getFullYear());
});
// (copie a função montarMiniCalendario para cá ou importe de outro arquivo JS se preferir)

// Função global para mudar data do FullCalendar
function mudarDataAgenda(dataIso) {
    if (window.myCalendar) {
        window.myCalendar.changeView('timeGridWeek', dataIso);
    }
}

// Mini calendário – Integração com agenda
const datasComemorativasExemplo = [
    { dia: 1, mes: 1, texto: "Ano Novo" },
    { dia: 25, mes: 12, texto: "Natal" },
    { dia: 7, mes: 9, texto: "Independência do Brasil" }
    // ...adicione outros comemorativos se quiser
];

function montarMiniCalendario(mesAtual, anoAtual) {
    const anoMin = 2020;
    const anoMax = (new Date()).getFullYear() + 50;
     // Ajuste de mês/ano
    let mes = mesAtual;
    let ano = anoAtual;

    if (mes < 0) {
        if (ano > anoMin) {
            mes = 11; ano--;
        } else {
            mes = 0; // trava no mínimo
        }
    }
    if (mes > 11) {
        if (ano < anoMax) {
            mes = 0; ano++;
        } else {
            mes = 11; // trava no máximo
        }
    }
     // Seletores DOM
    const miniCalendar = document.getElementById('miniCalendar');
    const listaDatas = document.getElementById('listaDatas');
    if (!miniCalendar || !listaDatas) return;
    miniCalendar.innerHTML = '';
    listaDatas.innerHTML = '';

    const meses = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
    const diasSemana = ["D","S","T","Q","Q","S","S"];

    // Header (mês/ano + botões de navegação)
    const header = document.createElement('div');
    header.className = 'mini-calendar-header';

    const btnPrev = document.createElement('button');
    btnPrev.innerHTML = '<i class="fas fa-chevron-left"></i>';
    btnPrev.onclick = () => montarMiniCalendario(mes - 1, ano);
    // Só habilita se não está no mínimo permitido
    btnPrev.disabled = (ano <= anoMin && mes === 0);
    header.appendChild(btnPrev);

    const spanMes = document.createElement('span');
    spanMes.textContent = `${meses[mes]} ${ano}`;
    header.appendChild(spanMes);

    const btnNext = document.createElement('button');
    btnNext.innerHTML = '<i class="fas fa-chevron-right"></i>';
    btnNext.onclick = () => montarMiniCalendario(mes + 1, ano);
    // Só habilita se não está no máximo permitido
    btnNext.disabled = (ano >= anoMax && mes === 11);
    header.appendChild(btnNext);

    miniCalendar.appendChild(header);

    // Grid de dias da semana
    const grid = document.createElement('div');
    grid.className = 'mini-calendar-grid';

    diasSemana.forEach((dia, idx) => {
        const cell = document.createElement('div');
        cell.textContent = dia;
        cell.className = 'mini-calendar-weekday';
        if (idx === 0) cell.style.color = "#c72626"; // domingo
        grid.appendChild(cell);
    });

    // Primeiro dia do mês
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const inicioSemana = primeiroDia.getDay();
    const diasNoMes = ultimoDia.getDate();

    // Preencher dias vazios antes do primeiro dia do mês
    for (let i = 0; i < inicioSemana; i++) {
        const vazio = document.createElement('div');
        vazio.className = 'mini-calendar-day';
        vazio.style.visibility = 'hidden';
        grid.appendChild(vazio);
    }

    // Dias do mês
    const hoje = new Date();
    for (let dia = 1; dia <= diasNoMes; dia++) {
        const cell = document.createElement('div');
        cell.className = 'mini-calendar-day';
        cell.textContent = dia;
        // Hoje destacado
        if (dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear()) {
            cell.classList.add('selected', 'today');
        }
        // Domingo destacado
        if (new Date(ano, mes, dia).getDay() === 0) {
            cell.classList.add('domingo');
        }
        // Comemorativos
        let comemorativo = datasComemorativasExemplo.find(dc => dc.dia === dia && dc.mes === (mes + 1));
        if (comemorativo) cell.classList.add('comemorativo');

        // Ao clicar em um dia do mini calendário: sincroniza agenda principal
        cell.onclick = function() {
            document.querySelectorAll('.mini-calendar-day').forEach(e => e.classList.remove('selected'));
            cell.classList.add('selected');
            
            // Atualiza a agenda principal, exemplo para FullCalendar:
            if (window.myCalendar) {
                const dataIso = `${ano}-${String(mes+1).padStart(2,'0')}-${String(dia).padStart(2,'0')}`;
                window.myCalendar.changeView('timeGridWeek', dataIso);
            }
        };
        grid.appendChild(cell);
    }
    miniCalendar.appendChild(grid);

    // Datas comemorativas (abaixo do mini calendário)
    datasComemorativasExemplo.filter(dc => dc.mes === (mes + 1)).forEach(dc => {
        const li = document.createElement('li');
        li.textContent = `${dc.dia}/${dc.mes}: ${dc.texto}`;
        listaDatas.appendChild(li);
    });
}

// ========== CALENDÁRIO GOOGLE AGENDA — SEMANA ==========
const datasComemorativas = [
    { dia: 12, mes: 6, nome: "Dia dos Namorados" },
    { dia: 24, mes: 6, nome: "São João" }
];

function getSemanaComDatas(dataRef) {
    let data = new Date(dataRef);
    let diaSemana = data.getDay();
    let diff = data.getDate() - diaSemana + (diaSemana == 0 ? -6 : 1); 
    let inicio = new Date(data.setDate(diff));
    let semana = [];
    for (let i = 0; i < 7; i++) {
        let d = new Date(inicio);
        d.setDate(d.getDate() + i);
        semana.push(d);
    }
    return semana;
}

function montarHeaderSemana(dataRef) {
    const header = document.getElementById('calendarSemanaHeader');
    if (!header) return;
    header.innerHTML = '<div></div>';
    const semana = getSemanaComDatas(dataRef);
    semana.forEach(d => {
        let sigla = d.toLocaleDateString('pt-BR', {weekday: 'short'});
        let dia = d.getDate();
        header.innerHTML += `
            <div>
                <div class="cabecalho-dia-semana">
                    <span class="semana-abrev">${sigla.replace('.', '')}</span>
                    <span class="dia-numero">${dia}</span>
                </div>
            </div>
        `;
    });
}
let horarioInicio = 8;
let horarioFim = 19;
function montarBodySemana(dataRef) {
    const body = document.getElementById('calendarSemanaBody');
    if (!body) return;
    body.innerHTML = '';
    const semana = getSemanaComDatas(dataRef);
    for (let h = horarioInicio; h <= horarioFim; h++){
        let row = '';
        row += `<div class="hora-label">${h.toString().padStart(2, '0')}:00</div>`;
        for (let d = 0; d < 7; d++) {
            let data = semana[d];
            let isComemorativo = datasComemorativas.find(dc => dc.dia == data.getDate() && dc.mes == (data.getMonth()+1));
            row += `<div class="cell${isComemorativo ? " comemorativo" : ""}" 
                data-dia="${data.toISOString().slice(0,10)}" data-hora="${h}:00" title="${isComemorativo ? "Data comemorativa: " + isComemorativo.nome : ""}">
            </div>`;
        }
        body.innerHTML += row;
    }
    
}

function atualizarSemanaExtenso(dataRef) {
    const span = document.getElementById('semanaExtenso');
    if (!span) return;
    const semana = getSemanaComDatas(dataRef);
    const inicio = semana[0];
    const fim = semana[6];
    let texto = `${inicio.getDate()} a ${fim.getDate()} de ${inicio.toLocaleDateString('pt-BR', {month:'long'})} de ${inicio.getFullYear()}`;
    span.textContent = texto.charAt(0).toUpperCase() + texto.slice(1);
}

let dataAtual = new Date();
montarHeaderSemana(dataAtual);
montarBodySemana(dataAtual);
atualizarSemanaExtenso(dataAtual);

// Abrir modal de agendamento já preenchendo a data
function abrirModalAgendamento(dataSelecionada) {
    carregarProfissionais();
    const dataInput = document.getElementById('dataAgendamento');
    if (dataInput && dataSelecionada) dataInput.value = dataSelecionada;
    document.getElementById('modalAgendamento').style.display = 'flex';
}
// NAVEGAÇÃO SPA + LOAD DOS MÓDULOS
document.querySelectorAll('.menu-lateral a[data-pagina]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        let pagina = this.getAttribute('data-pagina');
        document.getElementById('areaConteudo').innerHTML = '<p>Carregando...</p>';
        fetch('modulos/' + pagina)
            .then(resp => {
                if (!resp.ok) throw new Error('Erro ao carregar');
                return resp.text();
            })
            .then(html => {
                document.getElementById('areaConteudo').innerHTML = html;
                document.getElementById('areaConteudo').setAttribute('data-pagina', pagina);
                document.querySelectorAll('.menu-lateral li').forEach(li => li.classList.remove('active'));
                this.parentElement.classList.add('active');

                if (pagina === 'agenda.php') {
                    import('./js/agenda.js').then(modulo => {
                        modulo.inicializarAgenda();
                    });
                }
                // outros módulos...
            })
            .catch(() => {
                document.getElementById('areaConteudo').innerHTML = '<p>Erro ao carregar a página.</p>';
            });
    });
});
