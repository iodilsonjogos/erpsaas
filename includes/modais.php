<!-- includes/modais.php -->

<!-- Modal Cadastro Rápido de Profissional -->
<div class="modal-cadastro-prof" id="modalCadastroProf" style="display:none;">
    <div class="modal-conteudo">
        <button class="modal-fechar" id="fecharModalCadastroProf">&times;</button>
        <h3>Cadastro rápido de Profissional</h3>
        <form method="post" action="includes/salvar_profissional.php" id="formCadastroProf">
            <label>
                Nome do profissional:
                <input type="text" name="nome" required>
            </label>
            <button type="submit">Cadastrar</button>
        </form>
    </div>
</div>

<!-- Modal Agendamento do Calendário -->
<div class="modal-agendamento" id="modalAgendamento" style="display:none;">
    <div class="modal-conteudo">
        <button class="modal-fechar" id="fecharModalAgendamento">&times;</button>
        <h3>Novo Agendamento</h3>
        <form id="formAgendamento" method="POST" action="includes/salvar_agendamento.php">
            <label>
                Cliente:
                <input type="text" id="clienteAgendamento" required>
            </label>
            <label>
                Profissional:
                <select id="profissionalAgendamento" required>
                    <option value="">Selecione...</option>
                </select>
            </label>
            <label>
                Serviço:
                <select id="servicoAgendamento" required>
                    <option value="">Selecione...</option>
                </select>
            </label>
            <label>
                Data:
                <input type="date" id="dataAgendamento" required>
            </label>
            <label>
                Horário:
                <input type="time" id="horaAgendamento" required>
            </label>
            <button type="submit">Agendar</button>
        </form>
    </div>
</div>

<!-- Modal Fila de Espera -->
<!-- Modal Fila de Espera -->
<div id="modalOverlayFila" class="modal-overlay" style="display:none;" onclick="fecharModalFila(event)">
    <div class="modal-fila-form" onclick="event.stopPropagation()">
        <span class="modal-close" onclick="fecharModalFila(event)">&times;</span>
        <h2>Adicionar à Fila de Espera</h2>
        <form id="formFilaEspera" autocomplete="off">
            <div class="form-group">
                <label for="buscaCliente">Buscar cliente (nome, telefone, CPF):</label>
                <input id="buscaCliente" type="text" placeholder="Digite nome, telefone ou CPF" autocomplete="off">
                <div id="resultBusca"></div>
            </div>
            <div class="form-group">
                <label for="nomeManual">Nome do cliente:</label>
                <input id="nomeManual" type="text" placeholder="Nome do cliente" autocomplete="off">
            </div>
            <div class="form-group">
                <label for="servicoFila">Serviço:</label>
                <input id="servicoFila" type="text" placeholder="Serviço desejado" autocomplete="off">
            </div>
            <div class="form-group">
                <label for="telefoneFila">Telefone:</label>
                <input id="telefoneFila" type="text" placeholder="(99) 99999-9999" autocomplete="off">
            </div>
            <div class="form-group">
                <label for="obsFila">Observação:</label>
                <textarea id="obsFila" placeholder="Observação"></textarea>
            </div>
        </form>
        <div class="adicionar-fila" style="display: flex; gap: 10px;">
            <button type="submit" class="btn btn-primary" form="formFilaEspera" onclick="abrirModalFila()">Adicionar à fila</button>
            <button type="button" class="btn btn-secundario" onclick="adicionarFilaECadastrar()">Fila + Cadastro Cliente</button>
        </div>
    </div>
</div>


<!-- profissional do dia -->
<div id="modalAgendaProf" class="modal" style="display:none;">
    <div class="modal-content">
        <span class="close" onclick="fecharModalAgendaProf()">&times;</span>
        <h3 id="tituloModalAgendaProf">Agenda do Profissional</h3>
        <ul id="listaAgendamentosProf"></ul>
    </div>
</div>