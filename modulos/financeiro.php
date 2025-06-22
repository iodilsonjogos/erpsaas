<div class="pagina-financeiro-flex">
    <!-- Barra superior do financeiro -->
    <div class="financeiro-barra-superior">
        <h2>Financeiro</h2>
        <div class="financeiro-filtros">
            <select id="tipoMovimentacao">
                <option value="">Todos tipos</option>
                <option value="receita">Receita (entrada)</option>
                <option value="despesa">Despesa (saída)</option>
                <option value="pagar">A Pagar</option>
                <option value="receber">A Receber</option>
            </select>
            <select id="filtroCategoriaFinanceiro">
                <option value="">Todas categorias</option>
                <!-- Dinâmico do banco: ex. Procedimento, Venda, Compra, Salário, Taxa, Serviço... -->
            </select>
            <input type="date" id="filtroDataInicio" placeholder="Data início">
            <input type="date" id="filtroDataFim" placeholder="Data fim">
            <button type="button" id="btnFiltrarFinanceiro" class="btn btn-primary">Filtrar</button>
            <button type="button" id="btnNovoLancamento" class="btn btn-secundario">+ Novo Lançamento</button>
        </div>
    </div>

    <!-- Resumo financeiro do período -->
    <div class="financeiro-resumo">
        <div class="financeiro-card card-entrada">
            <h4>Entradas</h4>
            <span id="totalEntradas">R$ 0,00</span>
        </div>
        <div class="financeiro-card card-saida">
            <h4>Saídas</h4>
            <span id="totalSaidas">R$ 0,00</span>
        </div>
        <div class="financeiro-card card-saldo">
            <h4>Saldo</h4>
            <span id="saldoFinanceiro">R$ 0,00</span>
        </div>
    </div>

    <!-- Tabela de movimentações -->
    <div class="financeiro-lista">
        <table>
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Tipo</th>
                    <th>Categoria</th>
                    <th>Descrição</th>
                    <th>Cliente/Fornecedor</th>
                    <th>Valor (R$)</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tabelaFinanceiro">
                <tr>
                    <td colspan="8" style="text-align:center; color:#999;">Nenhuma movimentação encontrada.</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
