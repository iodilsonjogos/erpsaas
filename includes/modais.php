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
<div id="modalFilaEspera" class="modal" style="display:none;">
  <div class="modal-content">
    <span class="close" id="fecharModalFila">&times;</span>
    <h3>Adicionar à Fila de Espera</h3>
    <form id="formFilaEspera" autocomplete="off">
      <label for="buscaCliente">Buscar Cliente:</label>
      <input type="text" id="buscaCliente" placeholder="Nome, telefone..." autocomplete="off">
      <div id="resultBusca" style="margin-bottom: 10px;"></div>
      <label for="nomeManual">Nome manual (caso não cadastrado):</label>
      <input type="text" id="nomeManual" placeholder="Digite o nome completo">
      <label for="servicoFila">Serviço desejado:</label>
      <input type="text" id="servicoFila" placeholder="Ex: Corte, Consulta...">
      <label for="telefoneFila">Telefone (opcional):</label>
      <input type="text" id="telefoneFila" placeholder="(99) 99999-9999">
      <label for="obsFila">Observação:</label>
      <textarea id="obsFila" placeholder="Observação extra"></textarea>
      <button type="submit" class="btn-principal" style="margin-top:10px;">Adicionar</button>
    </form>
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
