
<div class="pagina-vendas-flex">
    <!-- Coluna esquerda: caixa/controle -->
    <div class="vendas-bloco-lateral">
        <h3>Controle de Caixa</h3>
        <div class="caixa-status">
            <p>Status: <span class="status-aberto">ABERTO</span></p>
            <button id="btnAbrirCaixa">Abrir Caixa</button>
            <button id="btnFecharCaixa">Fechar Caixa</button>
        </div>
        <div class="vendas-dia">
            <h4>Vendas do Dia</h4>
            <p>R$ <span id="totalVendasDia">0,00</span></p>
        </div>
        <div class="vendas-acoes">
            <button id="btnNovaVenda">+ Nova Venda</button>
            <button id="btnConsultarVendas">Consultar Vendas</button>
            <button id="btnImprimirRecibo">Imprimir Recibo</button>
        </div>
    </div>
    <!-- Conteúdo principal: formulário de venda e listagem -->
    <div class="vendas-bloco-principal">
        <h2>Venda / Caixa</h2>
        <!-- Formulário para nova venda -->
        <form id="formNovaVenda" autocomplete="off">
            <div class="form-row">
                <div class="form-group">
                    <label for="vendaCliente">Cliente</label>
                    <input type="text" id="vendaCliente" name="cliente" placeholder="Digite o nome do cliente" autocomplete="name">
                </div>
                <div class="form-group">
                    <label for="vendaData">Data</label>
                    <input type="date" id="vendaData" name="data" autocomplete="date">
                </div>
                <div class="form-group">
                    <label for="vendaHora">Hora</label>
                    <input type="time" id="vendaHora" name="hora" autocomplete="off">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="vendaServico">Serviço/Produto</label>
                    <input type="text" id="vendaServico" name="servico" placeholder="Serviço ou produto vendido" autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="vendaValor">Valor (R$)</label>
                    <input type="number" id="vendaValor" name="valor" step="0.01" placeholder="0,00" autocomplete="off">
                </div>
            </div>
            <button type="submit" id="btnSalvarVenda">Salvar Venda</button>
        </form>
        <!-- Lista das vendas do dia -->
        <div class="vendas-lista">
            <h4>Vendas Realizadas Hoje</h4>
            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Serviço/Produto</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="tabelaVendasDia">
                    <tr>
                        <td colspan="6" style="text-align:center; color:#999;">Nenhuma venda registrada hoje.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
