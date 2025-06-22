<div class="pagina-dashboard-flex">
    <div class="dashboard-barra-superior">
        <h2>Dashboard</h2>
        <!-- (opcional) Filtros globais, seleção de data, etc -->
        <!-- <input type="date" id="dashboardData"> -->
    </div>

    <!-- Cards de resumo rápidos -->
    <div class="dashboard-cards-resumo">
        <div class="card-dashboard card-clientes">
            <div class="card-label">Total de Clientes</div>
            <div class="card-valor" id="dashboardTotalClientes">...</div>
        </div>
        <div class="card-dashboard card-agendamentos">
            <div class="card-label">Agendamentos do Dia</div>
            <div class="card-valor" id="dashboardAgendamentosDia">...</div>
        </div>
        <div class="card-dashboard card-faturamento">
            <div class="card-label">Faturamento (Mês)</div>
            <div class="card-valor" id="dashboardFaturamento">...</div>
        </div>
        <div class="card-dashboard card-profissionais">
            <div class="card-label">Profissionais Ativos</div>
            <div class="card-valor" id="dashboardProfissionaisAtivos">...</div>
        </div>
    </div>

    <!-- Blocos extras -->
    <div class="dashboard-linha-blocos">
        <div class="dashboard-bloco" style="flex:2;">
            <h3>Gráfico de Faturamento</h3>
            <div id="graficoFaturamento"></div>
            <!-- (Ex: Chart.js, ApexCharts, Google Charts) -->
        </div>
        <div class="dashboard-bloco" style="flex:1;">
            <h3>Aniversariantes do Mês</h3>
            <ul id="listaAniversariantes">
                <li>...</li>
            </ul>
        </div>
        <div class="dashboard-bloco" style="flex:1;">
            <h3>Avisos do Sistema</h3>
            <ul id="listaAvisos">
                <li>...</li>
            </ul>
        </div>
    </div>
</div>
