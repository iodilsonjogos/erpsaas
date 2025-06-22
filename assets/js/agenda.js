export function inicializarAgenda() {
    let servicosSelecionados = [];
    const selectServico = document.getElementById('servicoAgendamento');
    const btnAddServico = document.getElementById('adicionarServico');
    const listaServicos = document.getElementById('servicosSelecionados');
    const tempoEstimado = document.getElementById('tempoEstimado');
    if (btnAddServico && selectServico) {
        btnAddServico.addEventListener('click', function(e) {
            e.preventDefault();
            const opt = selectServico.options[selectServico.selectedIndex];
            if (!opt.value) return;
            const id = opt.value;
            const nome = opt.textContent;
            const duracao = parseInt(opt.getAttribute('data-duracao'));
            if (servicosSelecionados.find(s => s.id === id)) return;
            servicosSelecionados.push({id, nome, duracao});
            renderizaServicos();
            calculaTempo();
        });
    }
    function renderizaServicos() {
        if (!listaServicos) return;
        listaServicos.innerHTML = '';
        servicosSelecionados.forEach((s, i) => {
            const sp = document.createElement('span');
            sp.textContent = `${s.nome}`;
            sp.style.background = '#F5F2FF';
            sp.style.margin = '3px 6px 3px 0';
            sp.style.padding = '4px 10px';
            sp.style.borderRadius = '13px';
            const rm = document.createElement('button');
            rm.textContent = '×';
            rm.style.marginLeft = '5px';
            rm.onclick = () => { servicosSelecionados.splice(i, 1); renderizaServicos(); calculaTempo(); };
            sp.appendChild(rm);
            listaServicos.appendChild(sp);
        });
    }
    function calculaTempo() {
        if (!tempoEstimado) return;
        const total = servicosSelecionados.reduce((acc, s) => acc + (s.duracao || 0), 0);
        tempoEstimado.value = total > 0 ? `${total} minutos` : '';
    }
    const form = document.getElementById('formAgendamentoAvancado');
    const erroDiv = document.getElementById('erroAgendamento');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (servicosSelecionados.length === 0) {
                if (erroDiv) {
                    erroDiv.textContent = 'Selecione pelo menos um serviço!';
                    erroDiv.style.display = 'block';
                }
                return;
            }
            if (erroDiv) erroDiv.style.display = 'none';
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
                    if (erroDiv) erroDiv.style.display = 'none';
                    atualizaAgendamentos();
                } else {
                    if (erroDiv) {
                        erroDiv.textContent = res.msg || 'Erro ao salvar agendamento!';
                        erroDiv.style.display = 'block';
                    }
                }
            })
            .catch(() => {
                if (erroDiv) {
                    erroDiv.textContent = 'Erro ao comunicar com o servidor!';
                    erroDiv.style.display = 'block';
                }
            });
        });
    }
    function atualizaAgendamentos() {
        fetch('modulos/lista_agendamentos.php')
            .then(resp => resp.text())
            .then(html => {
                const parser = new DOMParser();
                const novoDoc = parser.parseFromString(html, 'text/html');
                const novoTbody = novoDoc.querySelector('tbody');
                const tbodyAtual = document.querySelector('table tbody');
                if (novoTbody && tbodyAtual) {
                    tbodyAtual.innerHTML = novoTbody.innerHTML;
                }
            });
    }
}
