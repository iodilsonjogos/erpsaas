<?php
include __DIR__ . '/conexao.php';

$profissional_id = $_POST['profissional_id'];
$data = $_POST['data'];

// Pega todos agendamentos do dia
$stmt = $conn->prepare("SELECT a.id, a.hora FROM agendamentos a WHERE a.profissional_id = ? AND a.data = ?");
$stmt->bind_param("is", $profissional_id, $data);
$stmt->execute();
$res = $stmt->get_result();

$ocupados = [];
while ($ag = $res->fetch_assoc()) {
    $stmt2 = $conn->prepare("SELECT s.duracao 
        FROM agendamento_servicos ags 
        JOIN servicos s ON s.id = ags.servico_id
        WHERE ags.agendamento_id = ?");
    $stmt2->bind_param("i", $ag['id']);
    $stmt2->execute();
    $result2 = $stmt2->get_result();
    $duracao = 0;
    while ($sx = $result2->fetch_assoc()) {
        $duracao += (int)$sx['duracao'];
    }
    // Marca todos horários ocupados por esse agendamento
    $inicio = new DateTime("$data {$ag['hora']}");
    $fim = clone $inicio;
    $fim->modify("+$duracao minutes");

    $intervalo = new DateInterval('PT10M'); // intervalos de 10 minutos
    $period = new DatePeriod($inicio, $intervalo, $fim);

    foreach ($period as $dt) {
        $ocupados[] = $dt->format('H:i');
    }
}
echo json_encode($ocupados);
