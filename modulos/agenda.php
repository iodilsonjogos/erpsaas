<div class="pagina-agenda-flex">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h2>Agenda</h2>
        <button class="btn btn-primary" onclick="abrirModalAgendamento()">+ Novo Agendamento</button>
    </div>
    <div class="filtros-agenda">
        <input type="text" id="filtroCliente" placeholder="Buscar por cliente..." />
        <input type="date" id="filtroData" />
        <select id="filtroProfissional">
            <option value="">Todos os profissionais</option>
            <!-- Profissionais preenchidos por JS/PHP -->
        </select>
        <button class="btn btn-secundario" onclick="filtrarAgenda()">Filtrar</button>
    </div>
    <table class="tabela-agenda" id="tabelaAgendamentos">
        <thead>
            <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Profissional</th>
                <th>Serviço</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Obs.</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <!-- Carregado por JS -->
        </tbody>
    </table>
</div>