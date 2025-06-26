// Carrega profissionais e serviços no modal
function abrirModalAgendamento() {
    document.getElementById('modalAgendamento').style.display = 'flex';
    carregarProfissionais();
    // Profissional logado já marcado, se aplicável
    document.getElementById('formAgendamento').reset();
    document.getElementById('valorAgendamento').value = '';
}

// Fecha modal
function fecharModalAgendamento(event) {
    if (!event || event.target === document.getElementById('modalAgendamento') || event.target.classList.contains('btn-secundario')) {
        document.getElementById('modalAgendamento').style.display = 'none';
    }
}

// Carregar profissionais
function carregarProfissionais() {
    fetch('includes/api_profissionais.php')
        .then(r=>r.json())
        .then(lista => {
            let sel = document.getElementById('profissionalAgendamento');
            sel.innerHTML = '';
            lista.forEach(p => {
                let selected = (p.id == window.usuarioLogadoId) ? 'selected' : '';
                sel.innerHTML += `<option value="${p.id}" ${selected}>${p.nome}</option>`;
            });
            carregarServicosProfissional();
        });
}

// Ao mudar profissional, carrega serviços daquele profissional
document.getElementById('profissionalAgendamento').onchange = carregarServicosProfissional;

function carregarServicosProfissional() {
    const idProf = document.getElementById('profissionalAgendamento').value;
    fetch('includes/api_servicos_profissional.php?id=' + idProf)
        .then(r=>r.json())
        .then(lista => {
            let sel = document.getElementById('servicoAgendamento');
            sel.innerHTML = '';
            lista.forEach(s => {
                sel.innerHTML += `<option value="${s.id}" data-valor="${s.valor}">${s.nome}</option>`;
            });
            atualizarValorServico();
        });
}

// Ao mudar serviço, atualiza valor
document.getElementById('servicoAgendamento').onchange = atualizarValorServico;

function atualizarValorServico() {
    const sel = document.getElementById('servicoAgendamento');
    const valor = sel.selectedOptions[0] ? sel.selectedOptions[0].dataset.valor : '';
    document.getElementById('valorAgendamento').value = valor ? "R$ " + parseFloat(valor).toFixed(2) : '';
}

// Busca cliente
document.getElementById('buscaClienteAgendamento').oninput = function() {
    const q = this.value.trim();
    if (q.length < 3) {
        document.getElementById('resultBuscaClienteAgendamento').innerHTML = '';
        return;
    }
    fetch('includes/api_buscar_cliente.php?q=' + encodeURIComponent(q))
        .then(r=>r.json()).then(lista => {
            let html = '';
            lista.forEach(cli => {
                html += `<div class="cliSugestao" data-id="${cli.id}" data-nome="${cli.nome}">
                    <b>${cli.nome}</b> <small>${cli.telefone || ''}</small>
                </div>`;
            });
            document.getElementById('resultBuscaClienteAgendamento').innerHTML = html;
            document.querySelectorAll('.cliSugestao').forEach(div => {
                div.onclick = function() {
                    document.getElementById('buscaClienteAgendamento').value = div.dataset.nome;
                    document.getElementById('buscaClienteAgendamento').dataset.id_cliente = div.dataset.id;
                    document.getElementById('resultBuscaClienteAgendamento').innerHTML = '';
                };
            });
        });
};

// Salvar agendamento
document.getElementById('formAgendamento').onsubmit = function(e) {
    e.preventDefault();
    const id_cliente = document.getElementById('buscaClienteAgendamento').dataset.id_cliente;
    const profissional_id = document.getElementById('profissionalAgendamento').value;
    const servico_id = document.getElementById('servicoAgendamento').value;
    const data = document.getElementById('dataAgendamento').value;
    const hora = document.getElementById('horaAgendamento').value;
    const obs = document.getElementById('obsAgendamento').value;
    // Valor do serviço pode vir do select do serviço, por data-valor
    const valor = document.getElementById('servicoAgendamento').selectedOptions[0].dataset.valor;
    // usuario_id = window.usuarioLogadoId
    if (!id_cliente || !profissional_id || !servico_id || !data || !hora) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }
    fetch('includes/salvar_agendamento.php', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            id_cliente, profissional_id, servico_id, valor, data, hora, obs,
            usuario_id: window.usuarioLogadoId
        })
    }).then(r=>r.json()).then(res => {
        if (res.success) {
            fecharModalAgendamento();
            carregarAgendamentos(); // atualiza tabela!
        } else {
            alert(res.msg || 'Erro ao salvar!');
        }
    });
};

// Carregar tabela de agendamentos (com filtro)
function carregarAgendamentos() {
    const cliente = document.getElementById('filtroCliente').value;
    const data = document.getElementById('filtroData').value;
    const prof = document.getElementById('filtroProfissional').value;
    fetch('includes/api_agendamentos.php?cliente=' + encodeURIComponent(cliente) + '&data=' + encodeURIComponent(data) + '&profissional=' + encodeURIComponent(prof))
        .then(r=>r.json())
        .then(lista => {
            let tbody = document.getElementById('tabelaAgendamentos').querySelector('tbody');
            tbody.innerHTML = '';
            lista.forEach(a => {
                tbody.innerHTML += `<tr>
                    <td>${a.id}</td>
                    <td>${a.cliente}</td>
                    <td>${a.profissional}</td>
                    <td>${a.servico}</td>
                    <td>R$ ${parseFloat(a.valor).toFixed(2)}</td>
                    <td>${a.data}</td>
                    <td>${a.hora}</td>
                    <td>${a.obs || ''}</td>
                    <td><button class="btn btn-x" onclick="removerAgendamento(${a.id})">Remover</button></td>
                </tr>`;
            });
        });
}

function filtrarAgenda() { carregarAgendamentos(); }
