<div class="pagina-servicos-flex">
    <div class="servicos-barra-superior">
        <h2>Serviços</h2>
        <button id="btnNovoServico" class="btn btn-primary">+ Novo Serviço</button>
        <div class="servicos-filtros">
            <input type="text" id="buscaServico" placeholder="Buscar por nome, categoria ou código" autocomplete="off">
            <select id="filtroCategoriaServico">
                <option value="">Todas Categorias</option>
                <!-- Opções dinâmicas -->
            </select>
        </div>
    </div>
    <div class="servicos-lista">
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Serviço</th>
                    <th>Categoria</th>
                    <th>Valor (R$)</th>
                    <th>Tempo Estimado</th>
                    <th>Tipo</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tabelaServicos">
                <tr>
                    <td colspan="8" style="text-align:center; color:#999;">Nenhum serviço cadastrado.</td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="servicos-combos">
        <h3>Pacotes / Combos</h3>
        <table>
            <thead>
                <tr>
                    <th>Combo/Pacote</th>
                    <th>Serviços Inclusos</th>
                    <th>Valor Total</th>
                    <th>Tempo Total</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tabelaCombos">
                <tr>
                    <td colspan="6" style="text-align:center; color:#999;">Nenhum combo cadastrado.</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
