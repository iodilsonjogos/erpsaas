<div class="pagina-vendas-flex">

    <!-- BLOCO 1: CLIENTE -->
    <aside class="vendas-bloco-lateral">
        <h3>Cliente</h3>
        <input type="text" id="buscaClienteVenda" placeholder="Nome, telefone ou CPF" autocomplete="off" class="input-grande">
        <div id="resultBuscaClienteVenda"></div>
        <button class="btn btn-additem" type="button" onclick="abrirModalCadastroCliente()" style="margin-top:12px;">Novo Cliente</button>
        <h4 style="margin-top:34px;">Últimas Vendas</h4>
        <ul id="historicoVendasCliente" class="historico-vendas-lista"></ul>
    </aside>

    <!-- BLOCO 2: FORMULÁRIO PRINCIPAL -->
    <section class="vendas-bloco-principal">
        <h2 style="margin-bottom:20px;">Nova Venda / Atendimento</h2>
        <form id="formVenda" autocomplete="off">

            <!-- PROFISSIONAL E SERVIÇOS -->
            <div class="linha-dois-colunas">
                <div class="form-group">
                    <label for="profissionalVenda">Profissional</label>
                    <select id="profissionalVenda" required>
                        <option value="">Selecione o profissional...</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="servicoVenda">Serviço</label>
                    <select id="servicoVenda">
                        <option value="">Selecione um serviço...</option>
                    </select>
                    <button type="button" class="btn btn-additem" onclick="adicionarServico()">+ Adicionar Serviço</button>
                </div>
            </div>

            <!-- PRODUTOS -->
            <div class="linha-dois-colunas">
                <div class="form-group">
                    <label for="produtoVenda">Produto</label>
                    <select id="produtoVenda">
                        <option value="">Selecione um produto...</option>
                    </select>
                </div>
                <div class="form-group" style="display:flex; align-items:flex-end;">
                    <input type="number" id="qtdProdutoVenda" min="1" value="1" class="input-qtd-prod">
                    <button type="button" class="btn btn-additem" onclick="adicionarProduto()">+ Adicionar Produto</button>
                </div>
            </div>

            <!-- ITENS DA VENDA -->
            <div class="form-group">
                <label>Itens da venda:</label>
                <div class="card-tabela-itens">
                    <table id="tabelaItensVenda">
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Descrição</th>
                                <th>Qtd</th>
                                <th>Valor Un.</th>
                                <th>Subtotal</th>
                                <th>Comissão</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>

            <!-- DESCONTO E OBSERVAÇÃO -->
            <div class="linha-dois-colunas">
                <div class="form-group">
                    <label for="descontoVenda">Desconto (R$ ou %):</label>
                    <input type="text" id="descontoVenda" placeholder="Ex: 10, 5%">
                </div>
                <div class="form-group">
                    <label for="obsVenda">Observação:</label>
                    <input type="text" id="obsVenda">
                </div>
            </div>

            <!-- RESUMO E PAGAMENTO -->
            <div class="resumo-venda">
                <div>Subtotal: <span id="subtotalVenda">R$ 0,00</span></div>
                <div>Desconto: <span id="descResumoVenda">R$ 0,00</span></div>
                <div><b>Total: <span id="totalVenda">R$ 0,00</span></b></div>
            </div>
            <div class="form-group">
                <label for="pagamentoVenda">Forma de pagamento</label>
                <select id="pagamentoVenda">
                    <option value="dinheiro">Dinheiro</option>
                    <option value="pix">Pix</option>
                    <option value="cartao_debito">Cartão Débito</option>
                    <option value="cartao_credito">Cartão Crédito</option>
                    <option value="boleto">Boleto</option>
                    <option value="fiado">Fiado</option>
                    <option value="outro">Outro</option>
                </select>
            </div>

            <div style="margin-top:24px;">
                <button type="submit" class="btn btn-primary btn-grande">Finalizar venda / atendimento</button>
            </div>
        </form>
    </section>
</div>

<!-- Modal Recibo -->
<div id="modalRecibo" class="modal-overlay" style="display:none;z-index: 99999;" onclick="fecharModalRecibo(event)">
    <div class="modal-fila-form" style="max-width:410px;" onclick="event.stopPropagation()">
        <h3>Venda finalizada!</h3>
        <p>Deseja imprimir o recibo?</p>
        <div style="display:flex; gap:20px; justify-content:center; margin:20px 0;">
            <button class="btn btn-primary" onclick="imprimirRecibo()">Sim, imprimir</button>
            <button class="btn btn-secundario" onclick="fecharModalRecibo()">Não, obrigado</button>
        </div>
    </div>
</div>

<!-- Modal Recibo Pronto para Impressão -->
<div id="reciboPrintArea" style="display:none; background:#fff; color:#000; font-family:monospace; font-size:1.04em;">
    <!-- O recibo é montado via JS -->
</div>