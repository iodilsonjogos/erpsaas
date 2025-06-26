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

<!-- Modal de agendamento (montado por JS ou pode deixar o HTML fixo, como preferir) -->
<div id="modalAgendamento" class="modal-overlay" style="display:none;">
    <div class="modal-form" onclick="event.stopPropagation()" style="max-width:420px;">
        <h2 class="modal-titulo">Novo Agendamento</h2>
        <form id="formAgendamento" autocomplete="off">
            <div class="form-group">
                <label>Cliente</label>
                <input type="text" id="buscaClienteAgendamento" autocomplete="off" placeholder="Nome, telefone ou CPF..." />
                <div id="resultBuscaClienteAgendamento"></div>
                <button type="button" class="btn btn-linha" onclick="abrirModalCadastroCliente()">Novo Cliente</button>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Profissional</label>
                    <select id="profissionalAgendamento" required></select>
                </div>
                <div class="form-group">
                    <label>Serviço</label>
                    <select id="servicoAgendamento" required></select>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Valor</label>
                    <input type="text" id="valorAgendamento" disabled />
                </div>
                <div class="form-group">
                    <label>Data</label>
                    <input type="date" id="dataAgendamento" required />
                </div>
                <div class="form-group">
                    <label>Hora</label>
                    <input type="time" id="horaAgendamento" required />
                </div>
            </div>
            <div class="form-group">
                <label>Observação</label>
                <input type="text" id="obsAgendamento" />
            </div>
            <div class="form-rodape">
                <button type="submit" class="btn btn-primary">Salvar</button>
                <button type="button" class="btn btn-secundario" onclick="fecharModalAgendamento()">Cancelar</button>
            </div>
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