// =================== SPA: Carregamento dinâmico de JS por módulo ===================
// Cole este bloco no topo do seu script.js global (já incluso na index.php ou página principal).

const moduloScripts = {
  dashboard:     "assets/js/dash.js",
  home:          "assets/js/script.js",
  agenda:        "assets/js/agenda.js",
  vendas:        "assets/js/vendas.js",
  clientes:      "assets/js/clientes.js",
  profissionais: "assets/js/prof.js",
  produtos:      "assets/js/produtos.js",
  servicos:      "assets/js/servicos.js",
  relatorios:    "assets/js/relatorios.js",
  financeiro:    "assets/js/financeiro.js",
  configuracoes: "assets/js/config.js"
};

window.scriptsModulosCarregados = {}; // Armazena módulos já carregados

/**
 * Carrega dinamicamente o script JS de um módulo SPA.
 * @param {string} nomeModulo - Nome igual ao usado no objeto moduloScripts.
 * @param {function} callback - Função opcional para executar após o carregamento.
 */
function loadScriptModulo(nomeModulo, callback) {
  if (window.scriptsModulosCarregados[nomeModulo]) {
    // Script já carregado, executa o callback se existir
    if (typeof callback === "function") callback();
    return;
  }
  if (!moduloScripts[nomeModulo]) {
    console.warn("Script do módulo não encontrado:", nomeModulo);
    return;
  }
  var script = document.createElement('script');
  script.src = moduloScripts[nomeModulo];
  script.onload = function() {
    window.scriptsModulosCarregados[nomeModulo] = true;
    if (typeof callback === "function") callback();
  };
  document.body.appendChild(script);
}

// =================== EXEMPLO DE USO EM SPA ===================
// Suponha que você tenha um menu SPA que carrega módulos em uma div chamada #conteudo

function abrirModulo(nomeModulo, urlModuloPHP) {
  // Exemplo de carregar o HTML do módulo por AJAX (você pode adaptar para fetch ou outra forma)
  var xhr = new XMLHttpRequest();
  xhr.open("GET", urlModuloPHP, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      document.getElementById("conteudo").innerHTML = xhr.responseText;

      // Agora carregue o JS do módulo correspondente
      loadScriptModulo(nomeModulo, function() {
        // Se precisar, chame função de inicialização do módulo
        if (typeof window['inicializar' + capitalize(nomeModulo)] === "function") {
          window['inicializar' + capitalize(nomeModulo)]();
        }
      });
    }
  };
  xhr.send();
}

// Função utilitária para capitalizar a primeira letra
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/*
Como usar:
Para abrir o módulo vendas:
abrirModulo('vendas', 'modulos/vendas.php');

Para abrir o dashboard:
abrirModulo('dashboard', 'modulos/dashboard.php');

Para abrir clientes:
abrirModulo('clientes', 'modulos/clientes.php');

...e assim por diante!
*/

// ========== MENU LATERAL RETRÁTIL ==========
const toggleBtn = document.getElementById('toggle-menu');
const menuLateral = document.getElementById('menuLateral');
const mainContent = document.getElementById('conteudoPrincipal');
if (toggleBtn && menuLateral) {
    toggleBtn.addEventListener('click', () => {
        menuLateral.classList.toggle('recolhido');
        mainContent.style.marginLeft = menuLateral.classList.contains('recolhido') ? '70px' : '220px';
        if (window.myCalendar && typeof window.myCalendar.updateSize === 'function') {
        setTimeout(() => window.myCalendar.updateSize(), 330);
        setTimeout(() => window.myCalendar.updateSize(), 290); // pequeno delay para animar menu
    }
    });
}

// ========== POPOVER DE ATALHOS RÁPIDOS ==========
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

// ========== MODAL DE CADASTRO RÁPIDO DE PROFISSIONAL ==========
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
// ================= PAINEL FILA DE ESPERA ATUALIZADO =================

// Abrir o modal centralizado (novo padrão)
function abrirModalFila() {
  document.getElementById('modalOverlayFila').style.display = 'flex';
}
// Fechar modal ao clicar no X ou fora do modal
function fecharModalFila(event) {
  if (!event || event.target === document.getElementById('modalOverlayFila') || event.target.classList.contains('modal-close')) {
    document.getElementById('modalOverlayFila').style.display = 'none';
  }
}

// Botão para abrir o modal
const btnAddFila = document.getElementById('btnAddFila');
if (btnAddFila) btnAddFila.onclick = abrirModalFila;

// ================= FORMULÁRIO FILA =================

document.getElementById('formFilaEspera').onsubmit = function(e) {
    e.preventDefault();
    const buscaCliente = document.getElementById('buscaCliente');
    const id_cliente = buscaCliente && buscaCliente.dataset.id_cliente ? buscaCliente.dataset.id_cliente : '';
    const nome_manual = document.getElementById('nomeManual').value.trim();
    const servico = document.getElementById('servicoFila').value.trim();
    const telefone = document.getElementById('telefoneFila').value.trim();
    const observacao = document.getElementById('obsFila').value.trim();
    if (!id_cliente && !nome_manual) { 
        alert('Informe o nome do cliente!'); 
        return; 
    }
    fetch('includes/fila_espera.php', {
        method: 'POST',
        body: new URLSearchParams({
            action: 'add',
            id_cliente,
            nome_manual,
            servico,
            telefone,
            observacao
        })
    }).then(r=>r.json()).then(res => {
        if (res.success) {
            fecharModalFila();
            document.getElementById('formFilaEspera').reset();
            if (buscaCliente) buscaCliente.dataset.id_cliente = '';
            carregarFilaEspera();
        } else {
            alert(res.msg || 'Erro ao adicionar à fila!');
        }
    });
};

// ========== ATUALIZAR LISTA DA FILA ==========
function carregarFilaEspera() {
    fetch('includes/fila_espera.php?action=list')
        .then(r=>r.json()).then(res => {
        const ul = document.getElementById('listaFila');
        ul.innerHTML = '';
        if (!res.fila || res.fila.length === 0) {
            ul.innerHTML = '<li>Nenhum cliente na fila.</li>';
            return;
        }
        res.fila.forEach(f => {
            // Calcula tempo de espera em tempo real
            let tempoEspera = '';
            if (f.data_hora_entrada) {
                const entrada = new Date(f.data_hora_entrada.replace(' ', 'T'));
                const agora = new Date();
                let diff = Math.floor((agora - entrada) / 60000); // minutos
                tempoEspera = diff < 60 ? `${diff} min` : `${Math.floor(diff/60)}h ${diff%60}min`;
            }
            ul.innerHTML += `
        <li class="item-fila">
            <div class="linha1-fila">
            <span class="nome-fila">${f.cliente_nome || f.nome_manual}</span>
            <div class="botoes-fila">
                <button onclick="removerFila(${f.id}, 'atendido')" class="btn-v" title="Atender">
                <i class="ri-check-line"></i>
                </button>
                <button onclick="removerFila(${f.id}, 'removido')" class="btn-x" title="Remover da fila">
                <i class="ri-close-line"></i>
                </button>
            </div>
            </div>
            <div class="linha2-fila">
            <span class="servico-fila">${f.servico || ''}</span>
            <span class="tempo-fila">${tempoEspera}</span>
            </div>
        </li>
    `;
        });
    });
}
//==============Adicionar fila + cadastro======
function adicionarFilaECadastrar() {
  // Simula o submit do formulário (adiciona à fila)
  const formFila = document.getElementById('formFilaEspera');
  if (formFila) {
    // Força o submit do form
    formFila.dispatchEvent(new Event('submit', {bubbles:true, cancelable:true}));
  }
  // Aguarda um pouquinho para não conflitar com o submit, depois abre o modal de cadastro de cliente
  setTimeout(() => {
    abrirModalCadastroCliente(); // Implemente essa função!
  }, 600);
}

function abrirModalCadastroCliente() {
  // Aqui, implemente a lógica para abrir seu modal de cadastro completo de cliente
  // Exemplo inicial:
  alert('Abrir modal de cadastro de cliente!');
}

// ========== REMOVER/ATENDER NA FILA ==========
function removerFila(id, tipo) {
    let msg = (tipo === 'removido') 
      ? 'Deseja remover este cliente da fila?' 
      : 'Marcar este cliente como atendido?';
    if (!confirm(msg)) return;
    fetch('includes/fila_espera.php', {
        method: 'POST',
        body: new URLSearchParams({
            action: 'remove',
            id: id,
            tipo: tipo // 'atendido' ou 'removido'
        })
    }).then(r=>r.json()).then(res => {
        carregarFilaEspera();
    });
}

// ========== PESQUISA AUTOMÁTICA DE CLIENTE ==========
const buscaCliente = document.getElementById('buscaCliente');
if (buscaCliente) {
    buscaCliente.oninput = function() {
        const q = buscaCliente.value.trim();
        if (q.length < 3) {
            document.getElementById('resultBusca').innerHTML = '';
            buscaCliente.dataset.id_cliente = '';
            return;
        }
        fetch('includes/api_buscar_cliente.php?q=' + encodeURIComponent(q))
            .then(r=>r.json()).then(lista => {
                let html = '';
                lista.forEach(cli => {
                    html += `<div class="cliSugestao" data-id="${cli.id}" data-nome="${cli.nome}" data-tel="${cli.telefone}" data-cpf="${cli.cpf}">
                                <b>${cli.nome}</b> <small>${cli.telefone} ${cli.cpf ? 'CPF: '+cli.cpf : ''}</small>
                            </div>`;
                });
                document.getElementById('resultBusca').innerHTML = html;
                document.querySelectorAll('.cliSugestao').forEach(div => {
                    div.onclick = function() {
                        buscaCliente.value = div.dataset.nome;
                        buscaCliente.dataset.id_cliente = div.dataset.id;
                        document.getElementById('nomeManual').value = div.dataset.nome;
                        document.getElementById('telefoneFila').value = div.dataset.tel;
                        document.getElementById('resultBusca').innerHTML = '';
                    };
                });
            });
    };
}

// Sempre carrega a fila ao abrir a página
document.addEventListener('DOMContentLoaded', carregarFilaEspera);


// ========== MINI CALENDÁRIO LATERAL ==========
// ---- MINI CALENDÁRIO INTERATIVO INTEGRADO COM FULLCALENDAR E API ----

// Função para buscar datas comemorativas (API online + backend), aniversários (backend)
function buscarEventosDoMes(mes, ano, callback) {
    // Busca datas comemorativas do banco e da API BR
    fetch('includes/api_datas_comemorativas.php?mes=' + (mes + 1) + '&ano=' + ano)
        .then(resp => resp.json())
        .then(datasComemorativas => {
            // Busca aniversários (clientes, profissionais, colaboradores)
            fetch('includes/api_datas_aniversarios.php?mes=' + (mes + 1))
                .then(resp => resp.json())
                .then(aniversarios => {
                    
                    // Mescla tudo em um array
                    const eventos = [
                        ...datasComemorativas.map(dc => ({
                            dia: Number(dc.dia),
                            nome: dc.nome,
                            tipo: 'comemorativo'
                            
                        })),
                        
                        ...aniversarios.map(a => ({
                            dia: Number(a.dia),
                            nome: a.nome,
                            tipo: a.tipo // 'cliente', 'profissional', 'colaborador', etc
                        }))
                    ];
                    callback(eventos);
                    
                });
        });
}

function montarMiniCalendario(mes, ano, eventos = []) {
    const meses = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
    const diasSemana = ["D","S","T","Q","Q","S","S"];
    const hoje = new Date();

    const miniCalendar = document.getElementById('miniCalendar');
    const listaDatas = document.getElementById('listaDatas');
    if (!miniCalendar || !listaDatas) return;

    miniCalendar.innerHTML = '';

    // Header
    let html = `<div class="mini-calendar-header">
        <button id="btnMiniCalPrev">&lt;</button>
        <span>${meses[mes]} ${ano}</span>
        <button id="btnMiniCalNext">&gt;</button>
    </div>`;

    // Dias da semana
    html += '<div class="mini-calendar-grid">';
    diasSemana.forEach(dia => html += `<div class="mini-calendar-weekday">${dia}</div>`);

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i < primeiroDia; i++)
        html += `<div class="mini-calendar-day vazio"></div>`;

    for (let dia = 1; dia <= diasNoMes; dia++) {
        let classes = "mini-calendar-day";
        const dataObj = new Date(ano, mes, dia);
        if (
            dia === hoje.getDate() &&
            mes === hoje.getMonth() &&
            ano === hoje.getFullYear()
        ) classes += " today";

        // Se tem evento nesse dia
        const eventosDoDia = eventos.filter(ev => Number(ev.dia) === dia);
        if (eventosDoDia.length) classes += " comemorativo";
// DESTACAR DOMINGO:
    if (dataObj.getDay() === 0) classes += " domingo";
        html += `<div class="${classes}" data-dia="${dia}">${dia}</div>`;
    }
    html += '</div>';
    miniCalendar.innerHTML = html;

    // Navegação dos meses
    document.getElementById('btnMiniCalPrev').onclick = () => carregarMiniCalendario(mes - 1, ano);
    document.getElementById('btnMiniCalNext').onclick = () => carregarMiniCalendario(mes + 1, ano);

    // Clique nos dias
    document.querySelectorAll('.mini-calendar-day').forEach(cell => {
        cell.onclick = function() {
            if (this.classList.contains('vazio')) return;
            document.querySelectorAll('.mini-calendar-day').forEach(e => e.classList.remove('selected'));
            cell.classList.add('selected');

            // Mostra eventos do dia
            const dia = Number(this.dataset.dia);
            mostrarEventosDoDia(eventos.filter(ev => Number(ev.dia) === dia));
            // Se tiver FullCalendar, navega pro dia
            if (window.myCalendar) {
                const dataIso = `${ano}-${String(mes+1).padStart(2,'0')}-${String(dia).padStart(2,'0')}`;
                window.myCalendar.gotoDate(dataIso);
            }
        };
    });

    // Por padrão, mostra eventos do dia atual
    mostrarEventosDoDia(eventos.filter(ev => Number(ev.dia) === hoje.getDate()));
}

function mostrarEventosDoDia(eventos) {
    const listaDatas = document.getElementById('listaDatas');
    if (!listaDatas) return;
    listaDatas.innerHTML = "<b>Comemorativos:</b><br>";
    if (!eventos.length) {
        listaDatas.innerHTML += "<span style='color:#888'>Nenhum evento para o dia selecionado.</span>";
        return;
    }
    eventos.forEach(ev => {
        let tipo = '';
        if (ev.tipo === 'comemorativo') tipo = ' <span style="color:#e5a137">[Feriado]</span>';
        if (ev.tipo === 'cliente') tipo = ' <span style="color:#1a99e5">[Cliente]</span>';
        if (ev.tipo === 'profissional') tipo = ' <span style="color:#26b673">[Prof.]</span>';
        if (ev.tipo === 'colaborador') tipo = ' <span style="color:#ee77d7">[Colab.]</span>';
        if (ev.tipo === 'feriado_nacional') tipo = ' <span style="color:#c71d1d">[Feriado Nacional]</span>';
        if (ev.tipo === 'feriado_estadual') tipo = ' <span style="color:#2962ff">[Estadual]</span>';
        if (ev.tipo === 'feriado_municipal') tipo = ' <span style="color:#00b894">[Municipal]</span>';
        if (ev.tipo === 'comemorativo') tipo = ' <span style="color:#e5a137">[Comemorativo]</span>';
        listaDatas.innerHTML += `<div><span style="color:#ff7600">&#9733;</span> <b>${ev.nome}</b>${tipo}</div>`;
    });
}

// Função para carregar eventos do banco/API e renderizar calendário (chame ela)
function carregarMiniCalendario(mes, ano) {
    while (mes < 0) {
        mes += 12;
        ano -= 1;
    }
    while (mes > 11) {
        mes -= 12;
        ano += 1;
    }
    // Busca eventos do mês
    fetch('includes/api_datas_comemorativas.php?mes=' + (mes + 1) + '&ano=' + ano)
        .then(resp => resp.json())
        .then(eventos1 => {
            return fetch('includes/api_aniversarios.php?mes=' + (mes + 1))
                .then(resp => resp.json())
                .then(eventos2 => eventos1.concat(eventos2));
        })
        .then(eventosTodos => {
            montarMiniCalendario(mes, ano, eventosTodos);
        })
        .catch(() => {
            // Mesmo que falhe, mostra calendário vazio
            montarMiniCalendario(mes, ano, []);
        });
}

// Sempre mostra o mês atual ao abrir a página
document.addEventListener('DOMContentLoaded', function() {
    const hoje = new Date();
    carregarMiniCalendario(hoje.getMonth(), hoje.getFullYear());
});


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

// ========== MODAL AGENDAMENTO — ERP/SAAS ==========
// Profissionais dinâmicos
function carregarProfissionais() {
    const select = document.getElementById('profissionalAgendamento');
    if (!select) return;
    select.innerHTML = '<option value="">Carregando...</option>';
    fetch('includes/api_profissionais.php')
        .then(response => response.json())
        .then(dados => {
            select.innerHTML = '<option value="">Selecione...</option>';
            if (dados.length > 0) {
                dados.forEach(p => {
                    const opt = document.createElement('option');
                    opt.value = p.id;
                    opt.textContent = p.nome;
                    select.appendChild(opt);
                });
            } else {
                const opt = document.createElement('option');
                opt.textContent = 'Nenhum profissional cadastrado';
                opt.disabled = true;
                select.appendChild(opt);
            }
        });
}

// Abrir modal de agendamento já preenchendo a data
function abrirModalAgendamento(dataSelecionada) {
    carregarProfissionais();
    const dataInput = document.getElementById('dataAgendamento');
    if (dataInput && dataSelecionada) dataInput.value = dataSelecionada;
    document.getElementById('modalAgendamento').style.display = 'flex';
}

// Serviços por profissional (dinâmico)
const selectProfissional = document.getElementById('profissionalAgendamento');
const selectServico = document.getElementById('servicoAgendamento');
if (selectProfissional && selectServico) {
    selectProfissional.onchange = function() {
        const profissionalId = this.value;
        selectServico.innerHTML = '<option value="">Carregando...</option>';
        fetch('includes/api_servicos_profissional.php?id=' + profissionalId)
            .then(response => response.json())
            .then(dados => {
                selectServico.innerHTML = '<option value="">Selecione...</option>';
                if (dados.length > 0) {
                    dados.forEach(s => {
                        const opt = document.createElement('option');
                        opt.value = s.id;
                        opt.textContent = s.nome;
                        selectServico.appendChild(opt);
                    });
                } else {
                    const opt = document.createElement('option');
                    opt.textContent = 'Nenhum serviço cadastrado';
                    opt.disabled = true;
                    selectServico.appendChild(opt);
                }
            });
    };
}
// ========== CARREGAMENTO DINÂMICO DE PÁGINAS SPA ==========
// SPA simples: só troca o conteúdo principal (não mexe na lateral interna da home!)
document.querySelectorAll('.menu-lateral a[data-pagina]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const pagina = this.getAttribute('data-pagina');
        // Se for home (index), mostra o layout padrão
        if (pagina === 'index.php' || pagina === 'home.php') {
            document.querySelector('.layout-flex-principal').style.display = '';
            document.getElementById('areaConteudo').style.display = 'none';
            return;
        }
        // Para outros módulos, esconde a home e mostra o módulo
        document.querySelector('.layout-flex-principal').style.display = 'none';
        const areaConteudo = document.getElementById('areaConteudo');
        areaConteudo.style.display = '';
        areaConteudo.innerHTML = '<p>Carregando...</p>';
        fetch('modulos/' + pagina)
            .then(resp => resp.text())
            .then(html => {
                areaConteudo.innerHTML = html;
                // Ative o menu
                document.querySelectorAll('.menu-lateral li').forEach(li => li.classList.remove('active'));
                this.parentElement.classList.add('active');
            });
    });
});


// ========== MARCAR HORÁRIOS OCUPADOS ==========
function marcarHorariosOcupados(profissional_id, data, servicos) {
    fetch('includes/horarios_ocupados.php', {
        method: 'POST',
        body: new URLSearchParams({
            profissional_id, data, servicos: JSON.stringify(servicos)
        })
    })
    .then(r=>r.json()).then(ocupados => {
        document.querySelectorAll('#hora_inicio option').forEach(opt => {
            opt.classList.remove('ocupado');
            const hora = opt.value;
            if (ocupados.includes(hora)) {
                opt.classList.add('ocupado'); // CSS: .ocupado { color: #d12c2c; }
                opt.disabled = true; // ou apenas marque, ou esconda
            }
        });
    });
}
// ----- AGENDAMENTO MULTI-SERVIÇOS E AJAX -----
document.addEventListener('DOMContentLoaded', function() {
    // 1. Seleção e exibição dos serviços
    let servicosSelecionados = [];
    const selectServico = document.getElementById('servicoAgendamento');
    const btnAddServico = document.getElementById('adicionarServico');
    const listaServicos = document.getElementById('servicosSelecionados');
    const tempoEstimado = document.getElementById('tempoEstimado');
if (btnAddServico) {
    btnAddServico.addEventListener('click', function(e) {
        e.preventDefault();
        const opt = selectServico.options[selectServico.selectedIndex];
        if (!opt.value) return;
        const id = opt.value;
        const nome = opt.textContent;
        const duracao = parseInt(opt.getAttribute('data-duracao'));
        if (servicosSelecionados.find(s => s.id === id)) return; // não repete
        servicosSelecionados.push({id, nome, duracao});
        renderizaServicos();
        calculaTempo();
    });
}
    function renderizaServicos() {
        listaServicos.innerHTML = '';
        servicosSelecionados.forEach((s, i) => {
            const sp = document.createElement('span');
            sp.textContent = `${s.nome}`;
            sp.style.background = '#F5F2FF';
            sp.style.margin = '3px 6px 3px 0';
            sp.style.padding = '4px 10px';
            sp.style.borderRadius = '13px';
            // botão remover
            const rm = document.createElement('button');
            rm.textContent = '×';
            rm.style.marginLeft = '5px';
            rm.onclick = () => { servicosSelecionados.splice(i, 1); renderizaServicos(); calculaTempo(); };
            sp.appendChild(rm);
            listaServicos.appendChild(sp);
        });
    }

    function calculaTempo() {
        const total = servicosSelecionados.reduce((acc, s) => acc + (s.duracao || 0), 0);
        tempoEstimado.value = total > 0 ? `${total} minutos` : '';
    }

    // 2. SUBMISSÃO DO FORMULÁRIO AJAX
    const form = document.getElementById('formAgendamentoAvancado');
    const erroDiv = document.getElementById('erroAgendamento');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (servicosSelecionados.length === 0) {
            erroDiv.textContent = 'Selecione pelo menos um serviço!';
            erroDiv.style.display = 'block';
            return;
        }
        erroDiv.style.display = 'none';

        const formData = new FormData(form);
        formData.append('servicos', JSON.stringify(servicosSelecionados.map(s => s.id)));

        fetch('includes/salvar_agendamento.php', {
            method: 'POST',
            body: formData
        })
        .then(r => r.json())
        .then(res => {
            if (res.sucesso) {
                form.reset();
                servicosSelecionados = [];
                renderizaServicos();
                calculaTempo();
                erroDiv.style.display = 'none';
                atualizaAgendamentos(); // atualiza a lista!
            } else {
                erroDiv.textContent = res.msg || 'Erro ao salvar agendamento!';
                erroDiv.style.display = 'block';
            }
        })
        .catch(() => {
            erroDiv.textContent = 'Erro ao comunicar com o servidor!';
            erroDiv.style.display = 'block';
        });
    });
}
    // 3. ATUALIZAÇÃO DA LISTA DE AGENDAMENTOS
    function atualizaAgendamentos() {
        fetch('modulos/lista_agendamentos.php')
            .then(resp => resp.text())
            .then(html => {
                // Troca só o tbody, sem recarregar a página toda
                const parser = new DOMParser();
                const novoDoc = parser.parseFromString(html, 'text/html');
                const novoTbody = novoDoc.querySelector('tbody');
                document.querySelector('table tbody').innerHTML = novoTbody.innerHTML;
            });
    }


    // atualizaAgendamentos();
});
// Menu usuário dropdown topo
document.getElementById('btnMenuUsuario').onclick = function(e) {
    e.stopPropagation();
    let popup = document.getElementById('popupUsuario');
    popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
};
document.addEventListener('click', function() {
    let popup = document.getElementById('popupUsuario');
    if (popup) popup.style.display = 'none';
});
// Notificações popup
document.getElementById('btnNotificacoes').onclick = function(e) {
    e.stopPropagation();
    let popup = document.getElementById('popupNotificacoes');
    popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
};
document.addEventListener('click', function() {
    let popup = document.getElementById('popupNotificacoes');
    if (popup) popup.style.display = 'none';
});
        // Bloo Hash
function carregarModuloDoHash() {
    let modulo = window.location.hash.replace('#', '') || 'home';
    const areaConteudo = document.getElementById('areaConteudo');
    const layoutFlex = document.querySelector('.layout-flex-principal'); // container padrão da home

    // Atualiza menu ativo
    document.querySelectorAll('.menu-lateral li').forEach(li => li.classList.remove('active'));
    document.querySelectorAll('.menu-lateral a').forEach(link => {
        if (link.getAttribute('href') === '#' + modulo) {
            link.parentElement.classList.add('active');
        }
    });

    if (modulo === 'home') {
        // Exibe layout padrão da home/index, esconde SPA
        if (layoutFlex) layoutFlex.style.display = '';
        areaConteudo.style.display = 'none';
    } else {
        // Exibe SPA: esconde home e carrega módulo correto
        if (layoutFlex) layoutFlex.style.display = 'none';
        areaConteudo.style.display = '';
        areaConteudo.innerHTML = '<p>Carregando...</p>';
        // EXCEÇÃO: dashboard deve carregar dashboard.php, não index.php!
        const arquivoModulo = (modulo === 'dashboard') ? 'dashboard.php' : modulo + '.php';
        fetch('modulos/' + arquivoModulo)
            .then(resp => resp.text())
            .then(html => {
                areaConteudo.innerHTML = html;
                // Se usar scripts ou ícones, atualize aqui!
            loadScriptModulo(modulo);
            })
            .catch(() => {
                areaConteudo.innerHTML = '<p>Erro ao carregar a página.</p>';
            });
    }
}

// Sempre que o hash mudar, carregue o módulo correto
window.addEventListener('hashchange', carregarModuloDoHash);

// Ao abrir/atualizar a página, já carrega o módulo correto
window.addEventListener('DOMContentLoaded', carregarModuloDoHash);

//LISTA PROFISSIONAL DIA
function carregarProfissionaisDoDia() {
  fetch('includes/api_profissionais_dia.php')
    .then(r=>r.json())
    .then(profsDia => {
      const ul = document.getElementById('listaProfsDia');
      ul.innerHTML = '';
      if (!profsDia.length) {
        ul.innerHTML = '<li style="color:#999; text-align:center;">Nenhum profissional com agendamento hoje.</li>';
        return;
      }
      // Ordena por quantidade de agendamentos, decrescente
      profsDia.sort((a, b) => b.atendimentos - a.atendimentos);
      profsDia.forEach(prof => {
        ul.innerHTML += `
          <li class="item-prof" onclick="abrirAgendaProfissional(${prof.id}, '${prof.nome}')">
            <span class="nome-prof" title="${prof.nome}">${prof.nome}</span>
            <span class="num-agendas" title="Agendamentos hoje">${prof.atendimentos}</span>
          </li>
        `;
      });
    });
}

function abrirAgendaProfissional(id_prof, nome) {
  // Aqui você vai abrir o modal SPA (agenda do profissional)
  abrirModalAgendaProf(id_prof, nome);
}
