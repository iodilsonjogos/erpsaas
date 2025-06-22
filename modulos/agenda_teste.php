
<main id="conteudoPrincipal">

    <!-- ==== INÍCIO DO CONTEÚDO DA AGENDA ==== -->
<div class="pagina-agenda-flex">
    <!-- Formulário -->
    <div class="bloco-form">
        <h2>Novo Agendamento</h2>
        <form id="formAgendamentoAvancado">
            <div class="form-row">
                <div class="form-group" style="flex:1;">
                    <label>Data:<input type="date" id="dataAgendamento" name="dataAgendamento" required></label>
                    
                </div>
                <div class="form-group" style="flex:1;">
                    <label>Início:<input type="time" id="horaAgendamento" name="horaAgendamento" required></label>
                    
                </div>
            </div>
            <div class="form-group">
                <label>Cliente:<input type="text" id="buscaCliente" name="buscaCliente" required placeholder="Nome do cliente"></label>
                
                <button type="button" id="btnNovoCliente" style="margin-top:5px;">Novo cliente</button>
            </div>
            <div class="form-group">
                <label>Telefone:<input type="tel" id="telefoneCliente" name="telefoneCliente" required placeholder="+55 (__) _____-____"></label>
                
            </div>
            <div class="form-group">
                <label for="profissionalAgendamento">Profissional:</label>
                <select id="profissionalAgendamento" name="profissionalAgendamento" required>
                    <option value="">Selecione</option>
                    <?php foreach ($profissionais as $p): ?>
                        <option value="<?= $p['id'] ?>"><?= $p['nome'] ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="form-group">
                <label for="servicoAgendamento">Serviços:</label>
                <div style="display:flex;gap:10px;">
                    <select id="servicoAgendamento" name="servicoAgendamento">
                        <option value="">Selecione...</option>
                        <?php foreach ($servicos as $s): ?>
                            <option value="<?= $s['id'] ?>" data-duracao="<?= $s['duracao'] ?>">
                                <?= $s['nome'] ?> (<?= $s['duracao'] ?> min)
                            </option>
                        <?php endforeach; ?>
                    </select>
                    <button type="button" id="adicionarServico">Adicionar</button>
                </div>
                <div id="servicosSelecionados" style="margin-top:6px;"></div>
            </div>
            <div class="form-row">
                <div class="form-group" style="flex:1;">
                    <label>Tempo estimado:<input type="text" id="tempoEstimado" name="tempoEstimado" readonly></label>
                    
                </div>
                <div class="form-group" style="flex:1;">
                    <label><input type="checkbox" id="lembreteWhatsapp" name="lembreteWhatsapp">  Lembrete via WhatsApp</label>
                        
                        
                    
                </div>
            </div>
            <div class="form-group">
                <label for="obsAgendamento">Observações:</label>
                <textarea id="obsAgendamento" name="obsAgendamento"></textarea>
            </div>
            <div id="erroAgendamento" style="color:#d12c2c; font-size:1em; margin-bottom:8px;display:none"></div>
            <button type="submit" style="width:100%;">Salvar Agendamento</button>
        </form>
    </div>
    <!-- Lista de agendamentos -->
    <div class="bloco-lista">
        <h3>Agendamentos de hoje (<?= date('d/m/Y') ?>)</h3>
        <table style="width:100%; border-collapse:collapse;">
            <thead>
                <tr style="background:#F5F2FF;">
                    <th style="padding:8px; border-radius:7px 0 0 7px;">Horário</th>
                    <th style="padding:8px;">Cliente</th>
                    <th style="padding:8px;">Profissional</th>
                    <th style="padding:8px;">Serviços</th>
                    <th style="padding:8px;">Observações</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($agendamentos as $ag): ?>
                    <?php
                        // Buscar serviços do agendamento
                        $servicos_texto = [];
                        $sql2 = "SELECT s.nome FROM agendamento_servicos ags JOIN servicos s ON s.id = ags.servico_id WHERE ags.agendamento_id = ?";
                        $stmt2 = $conn->prepare($sql2);
                        $stmt2->bind_param('i', $ag['id']);
                        $stmt2->execute();
                        $res2 = $stmt2->get_result();
                        while ($row2 = $res2->fetch_assoc()) {
                            $servicos_texto[] = $row2['nome'];
                        }
                    ?>
                    <tr>
                        <td style="padding:6px;"><?= htmlspecialchars($ag['hora']) ?></td>
                        <td style="padding:6px;"><?= htmlspecialchars($ag['cliente']) ?></td>
                        <td style="padding:6px;"><?= htmlspecialchars($ag['profissional_nome']) ?></td>
                        <td style="padding:6px;"><?= htmlspecialchars(implode(', ', $servicos_texto)) ?></td>
                        <td style="padding:6px;"><?= htmlspecialchars($ag['observacoes'] ?? '') ?></td>
                    </tr>
                <?php endforeach; ?>
                <?php if (count($agendamentos) == 0): ?>
                    <tr><td colspan="5" style="text-align:center; color:#999; padding:18px;">Nenhum agendamento para hoje.</td></tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>
</main>