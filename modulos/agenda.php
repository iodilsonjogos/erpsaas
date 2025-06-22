<div class="pagina-agenda-central">
    <!-- Barra superior da agenda -->
    <div class="agenda-barra-superior">
        <h2>Agenda</h2>
        <div class="agenda-filtros">
            <input type="date" id="filtroDataAgenda" value="<?= date('Y-m-d') ?>">
            <select id="filtroProfissionalAgenda">
                <option value="">Todos os profissionais</option>
                <?php foreach ($profissionais as $p): ?>
                    <option value="<?= $p['id'] ?>"><?= htmlspecialchars($p['nome']) ?></option>
                <?php endforeach; ?>
            </select>
            <button type="button" class="btn btn-primary" id="btnFiltrarAgenda">Filtrar</button>
            <button type="button" class="btn btn-primary" id="btnNovoAgendamento">+ Novo Agendamento</button>
        </div>
    </div>
    
    <!-- Bloco principal: Formulário e lista em coluna -->
    <div class="agenda-bloco-central">
        <!-- Formulário avançado -->
        <div class="bloco-form">
            <h3>Novo Agendamento</h3>
            <form id="formAgendamentoAvancado" autocomplete="off">
                <div class="form-row">
                    <div class="form-group">
                        <label for="dataAgendamento">Data:</label>
                        <input type="date" id="dataAgendamento" name="dataAgendamento" required value="<?= date('Y-m-d') ?>">
                    </div>
                    <div class="form-group">
                        <label for="horaAgendamento">Horário:</label>
                        <input type="time" id="horaAgendamento" name="horaAgendamento" required>
                    </div>
                    <div class="form-group">
                        <label for="profissionalAgendamento">Profissional:</label>
                        <select id="profissionalAgendamento" name="profissionalAgendamento" required>
                            <option value="">Selecione</option>
                            <?php foreach ($profissionais as $p): ?>
                                <option value="<?= $p['id'] ?>"><?= htmlspecialchars($p['nome']) ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="buscaCliente">Cliente:</label>
                        <input type="text" id="buscaCliente" name="buscaCliente" required placeholder="Nome do cliente">
                    </div>
                    <div class="form-group">
                        <label for="telefoneCliente">Telefone:</label>
                        <input type="tel" id="telefoneCliente" name="telefoneCliente" placeholder="(__) _____-____">
                    </div>
                    <div class="form-group">
                        <label for="servicoAgendamento">Serviço:</label>
                        <select id="servicoAgendamento" name="servicoAgendamento">
                            <option value="">Selecione...</option>
                            <?php foreach ($servicos as $s): ?>
                                <option value="<?= $s['id'] ?>"><?= htmlspecialchars($s['nome']) ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="tempoEstimado">Tempo estimado:</label>
                        <input type="text" id="tempoEstimado" name="tempoEstimado" readonly>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="lembreteWhatsapp" name="lembreteWhatsapp"> Lembrete WhatsApp
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label for="obsAgendamento">Observações:</label>
                    <textarea id="obsAgendamento" name="obsAgendamento" rows="2"></textarea>
                </div>
                <div id="erroAgendamento" style="color:#d12c2c; font-size:1em; margin-bottom:8px; display:none"></div>
                <button type="submit" class="btn btn-primary" style="width:100%;">Salvar Agendamento</button>
            </form>
        </div>
        
        <!-- Lista de agendamentos -->
        <div class="bloco-lista">
            <h3>Agendamentos de <span id="dataSelecionada"><?= date('d/m/Y') ?></span></h3>
            <table class="tabela-agendamentos">
                <thead>
                    <tr>
                        <th>Horário</th>
                        <th>Cliente</th>
                        <th>Profissional</th>
                        <th>Serviço</th>
                        <th>Observações</th>
                    </tr>
                </thead>
                <tbody id="tbodyAgendamentos">
                    <?php if (!empty($agendamentos)): ?>
                        <?php foreach ($agendamentos as $ag): ?>
                            <tr>
                                <td><?= htmlspecialchars($ag['hora']) ?></td>
                                <td><?= htmlspecialchars($ag['cliente']) ?></td>
                                <td><?= htmlspecialchars($ag['profissional_nome']) ?></td>
                                <td><?= htmlspecialchars($ag['servico_nome'] ?? '') ?></td>
                                <td><?= htmlspecialchars($ag['observacoes'] ?? '') ?></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr>
                            <td colspan="5" style="text-align:center; color:#999; padding:18px;">
                                Nenhum agendamento para este dia.
                            </td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
