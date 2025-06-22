<div class="pagina-relatorios-flex">
    <!-- Barra superior dos relatórios -->
    <div class="relatorios-barra-superior">
        <h2>Relatórios</h2>
        <div class="relatorios-filtros">
            <select id="tipoRelatorio">
                <option value="financeiro">Financeiro</option>
                <option value="atendimentos">Atendimentos</option>
                <option value="clientes">Clientes</option>
                <option value="profissionais">Profissionais</option>
                <!-- Outras opções conforme necessidade -->
            </select>
            <input type="date" id="relatorioDataInicio" placeholder="Data início">
            <input type="date" id="relatorioDataFim" placeholder="Data fim">
            <button type="button" id="btnGerarRelatorio" class="btn btn-primary">Gerar Relatório</button>
        </div>
    </div>
    <!-- Conteúdo do relatório dinâmico -->
    <div class="relatorios-bloco-conteudo">
        <div id="relatorioConteudo" class="relatorio-lista">
            <p style="color: #888; text-align: center;">Selecione um tipo de relatório e período para visualizar.</p>
            <!-- Aqui será inserida a tabela/relatório dinâmico via JS ou PHP -->
        </div>
    </div>
</div>
