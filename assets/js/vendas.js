// vendas.js

// 6. Eventos principais
document.addEventListener('DOMContentLoaded', function(){
    // Inicializa campos, listeners, integração com fila (preenche cliente se vier da fila), etc.
});
// vendas.js

// =================== CLIENTE ===================
function buscarCliente(q) {
  // Busca cliente por nome/telefone/CPF (AJAX)
}

function preencherCliente(cliente) {
  // Preenche campos do form com dados do cliente selecionado
}

function abrirModalCadastroCliente() {
  // Abre modal de cadastro de cliente (para quem não está cadastrado)
}

// Integração com fila: 
function preencherClienteDaFila(clienteFila) {
  // Chamada se cliente veio da fila, já preenche dados
}

// =================== PROFISSIONAL & SERVIÇO ===================
function buscarProfissionais() {
  // Busca lista de profissionais via AJAX para popular o select
}

function buscarServicosPorProfissional(idProfissional) {
  // Busca serviços/especialidades via AJAX para o profissional selecionado
}

// =================== ITENS DA VENDA (SERVIÇO/PRODUTO) ===================
function adicionarServico() {
  // Adiciona serviço selecionado à lista de itens da venda
}

function adicionarProduto() {
  // Adiciona produto selecionado à lista de itens da venda
}

function removerItem(index) {
  // Remove item (serviço/produto) da lista
}

function calcularResumoVenda() {
  // Calcula subtotal, desconto, comissão, total
}

// =================== COMISSÃO ===================
function calcularComissao(valor, percentual) {
  return (valor * percentual / 100);
}

// =================== FINALIZAÇÃO ===================
function finalizarVenda(e) {
  e.preventDefault();
  // Coleta todos os dados do form e envia via AJAX para salvar_venda.php
  // Se sucesso: pergunta se deseja imprimir recibo
  perguntarImpressaoRecibo(response.id_venda);
}

function perguntarImpressaoRecibo(idVenda) {
  // Abre modal: "Deseja imprimir recibo?"
  // Se sim: chama imprimirRecibo(idVenda)
  // Se não: fecha modal, limpa form, etc.
}

function imprimirRecibo(idVenda) {
  // Pode abrir popup com recibo pronto para imprimir
}

// CLIENTE: Busca e seleção
let clienteSelecionado = null;

document.getElementById('buscaClienteVenda').oninput = function() {
  const q = this.value.trim();
  if (q.length < 3) {
    document.getElementById('resultBuscaClienteVenda').innerHTML = '';
    clienteSelecionado = null;
    return;
  }
  fetch('includes/api_buscar_cliente.php?q=' + encodeURIComponent(q))
    .then(r=>r.json()).then(lista => {
      let html = '';
      lista.forEach(cli => {
        html += `<div class="cliSugestao" data-id="${cli.id}" data-nome="${cli.nome}" data-tel="${cli.telefone}" data-cpf="${cli.cpf || ''}">
          <b>${cli.nome}</b> <small>${cli.telefone} ${cli.cpf ? 'CPF: '+cli.cpf : ''}</small>
        </div>`;
      });
      document.getElementById('resultBuscaClienteVenda').innerHTML = html;
      document.querySelectorAll('.cliSugestao').forEach(div => {
        div.onclick = function() {
          clienteSelecionado = {
            id: div.dataset.id,
            nome: div.dataset.nome,
            telefone: div.dataset.tel,
            cpf: div.dataset.cpf
          };
          document.getElementById('buscaClienteVenda').value = div.dataset.nome;
          document.getElementById('resultBuscaClienteVenda').innerHTML = '';
          carregarHistoricoVendasCliente(clienteSelecionado.id);
        };
      });
    });
};

function carregarHistoricoVendasCliente(idCliente) {
  fetch('includes/api_historico_vendas.php?id_cliente='+idCliente)
    .then(r=>r.json())
    .then(lista => {
      let html = '';
      lista.forEach(v => {
        html += `<li>${v.data} - ${v.resumo} - R$ ${v.valor}</li>`;
      });
      document.getElementById('historicoVendasCliente').innerHTML = html || '<li>Nenhuma venda encontrada</li>';
    });
}

// INTEGRAÇÃO COM FILA DE ESPERA
function preencherClienteDaFila(clienteFila) {
  // Chame esta função ao integrar com o painel da fila de espera
  clienteSelecionado = {
    id: clienteFila.id,
    nome: clienteFila.nome,
    telefone: clienteFila.telefone,
    cpf: clienteFila.cpf || ''
  };
  document.getElementById('buscaClienteVenda').value = clienteFila.nome;
  carregarHistoricoVendasCliente(clienteFila.id);
}

let profissionalSelecionado = null;
let servicosProfissional = []; // Serviços disponíveis para o profissional

document.getElementById('profissionalVenda').onchange = function() {
  profissionalSelecionado = this.value;
  // Busca serviços do profissional selecionado
  fetch('includes/api_servicos_profissional.php?id=' + profissionalSelecionado)
    .then(r=>r.json()).then(lista => {
      servicosProfissional = lista;
      let sel = document.getElementById('servicoVenda');
      sel.innerHTML = '<option value="">Selecione um serviço...</option>';
      lista.forEach(s => {
        sel.innerHTML += `<option value="${s.id}" data-valor="${s.valor}" data-comissao="${s.comissao}">${s.nome}</option>`;
      });
    });
};

let itensVenda = [];

function adicionarServico() {
  const sel = document.getElementById('servicoVenda');
  const id = sel.value;
  if (!id) return;
  const servico = servicosProfissional.find(s => s.id == id);
  if (!servico) return;
  // Verifica se já foi adicionado
  if (itensVenda.find(i => i.tipo === 'servico' && i.id == id)) {
    alert('Este serviço já foi adicionado!');
    return;
  }
  itensVenda.push({
    tipo: 'servico',
    id: id,
    descricao: servico.nome,
    quantidade: 1,
    valor_unitario: parseFloat(servico.valor),
    comissao: parseFloat(servico.comissao || 0)
  });
  renderizarItensVenda();
  calcularResumoVenda();
}

function adicionarProduto() {
  const sel = document.getElementById('produtoVenda');
  const id = sel.value;
  const qtd = parseInt(document.getElementById('qtdProdutoVenda').value) || 1;
  if (!id || qtd < 1) return;
  // Exemplo estático: no real busque valor/comissão do produto via JS ou backend!
  const nome = sel.options[sel.selectedIndex].text;
  const valor = parseFloat(sel.options[sel.selectedIndex].dataset.valor);
  itensVenda.push({
    tipo: 'produto',
    id: id,
    descricao: nome,
    quantidade: qtd,
    valor_unitario: valor,
    comissao: 0
  });
  renderizarItensVenda();
  calcularResumoVenda();
}

function removerItem(index) {
  itensVenda.splice(index, 1);
  renderizarItensVenda();
  calcularResumoVenda();
}

function renderizarItensVenda() {
  const tbody = document.querySelector('#tabelaItensVenda tbody');
  tbody.innerHTML = '';
  itensVenda.forEach((item, idx) => {
    const subtotal = (item.quantidade * item.valor_unitario).toFixed(2);
    const comissao = (item.comissao ? ((item.valor_unitario * item.quantidade) * item.comissao / 100).toFixed(2) : '-');
    tbody.innerHTML += `<tr>
      <td>${item.tipo}</td>
      <td>${item.descricao}</td>
      <td>${item.quantidade}</td>
      <td>R$ ${item.valor_unitario.toFixed(2)}</td>
      <td>R$ ${subtotal}</td>
      <td>${comissao}</td>
      <td><button type="button" onclick="removerItem(${idx})">Remover</button></td>
    </tr>`;
  });
}

function calcularResumoVenda() {
  let subtotal = itensVenda.reduce((acc, item) => acc + (item.valor_unitario * item.quantidade), 0);
  let desc = 0;
  let descontoInput = document.getElementById('descontoVenda').value.trim();
  if (descontoInput.endsWith('%')) {
    desc = subtotal * (parseFloat(descontoInput) / 100);
  } else {
    desc = parseFloat(descontoInput) || 0;
  }
  let total = subtotal - desc;
  document.getElementById('subtotalVenda').textContent = "R$ " + subtotal.toFixed(2);
  document.getElementById('descResumoVenda').textContent = "R$ " + desc.toFixed(2);
  document.getElementById('totalVenda').textContent = "R$ " + total.toFixed(2);
}

document.getElementById('descontoVenda').oninput = calcularResumoVenda;

document.getElementById('formVenda').onsubmit = function(e) {
  e.preventDefault();
  if (!clienteSelecionado) {
    alert('Selecione o cliente!');
    return;
  }
  if (!profissionalSelecionado) {
    alert('Selecione o profissional!');
    return;
  }
  if (!itensVenda.length) {
    alert('Adicione pelo menos um serviço ou produto!');
    return;
  }
  const pagamento = document.getElementById('pagamentoVenda').value;
  const obs = document.getElementById('obsVenda').value;
  let desc = document.getElementById('descontoVenda').value.trim();
  let total = document.getElementById('totalVenda').textContent.replace('R$', '').replace(',','.');
  // Prepara dados para enviar
  let vendaData = {
    id_cliente: clienteSelecionado.id,
    profissional_id: profissionalSelecionado,
    itens: itensVenda,
    pagamento: pagamento,
    desconto: desc,
    obs: obs,
    total: parseFloat(total)
  };
  fetch('includes/salvar_venda.php', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(vendaData)
  })
  .then(r=>r.json()).then(res => {
    if (res.success) {
      // Mostra modal de recibo!
      window.idVendaGerada = res.id_venda;
      document.getElementById('modalRecibo').style.display = 'flex';
      // Limpa venda na tela:
      itensVenda = [];
      renderizarItensVenda();
      calcularResumoVenda();
      // Limpa campos, se quiser
    } else {
      alert(res.msg || 'Erro ao salvar venda!');
    }
  });
}

// Modal de recibo
function imprimirRecibo() {
  document.getElementById('modalRecibo').style.display = 'none';
  // Pode fazer fetch do recibo por idVendaGerada se preferir
  montarReciboParaImprimir(window.idVendaGerada);
}

function fecharModalRecibo(event) {
  if (!event || event.target === document.getElementById('modalRecibo') || event.target.classList.contains('btn-secundario')) {
    document.getElementById('modalRecibo').style.display = 'none';
  }
}

// Monta recibo pronto para impressão
function montarReciboParaImprimir(idVenda) {
  // Aqui pode montar via fetch no backend ou direto do JS
  // Exemplo básico:
  const printArea = document.getElementById('reciboPrintArea');
  printArea.innerHTML = `
    <div style="text-align:center;font-size:1.15em;">
      <b>RECIBO DE VENDA/ATENDIMENTO</b>
      <hr>
      Cliente: ${clienteSelecionado.nome}<br>
      Profissional: ${document.getElementById('profissionalVenda').selectedOptions[0].text}<br>
      Total pago: <b>${document.getElementById('totalVenda').textContent}</b><br>
      <hr>
      Obrigado pela preferência!
    </div>
  `;
  printArea.style.display = 'block';
  window.print();
  printArea.style.display = 'none';
}
