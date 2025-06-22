<?php
include __DIR__ . '/../includes/conexao.php';
$data_hoje = date('Y-m-d');
$sql = "SELECT a.*, p.nome as profissional_nome FROM agendamentos a 
        JOIN profissionais p ON p.id = a.profissional_id
        WHERE a.data = ?
        ORDER BY a.hora ASC";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $data_hoje);
$stmt->execute();
$res = $stmt->get_result();
$agendamentos = [];
while ($row = $res->fetch_assoc()) {
    $agendamentos[] = $row;
}
foreach ($agendamentos as $ag):
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
