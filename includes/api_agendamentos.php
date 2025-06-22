<?php
// includes/api_agendamentos.php
include __DIR__ . '/conexao.php';

// Captura intervalo (FullCalendar manda start e end via GET)
$start = isset($_GET['start']) ? $_GET['start'] : date('Y-m-01');
$end   = isset($_GET['end'])   ? $_GET['end']   : date('Y-m-t');

// Consulta todos os agendamentos do intervalo
$sql = "SELECT a.id, a.cliente, a.profissional_id, a.servico, a.data, a.hora, 
               p.nome AS profissional 
        FROM agendamentos a
        LEFT JOIN profissionais p ON p.id = a.profissional_id
        WHERE a.data >= ? AND a.data <= ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $start, $end);
$stmt->execute();
$res = $stmt->get_result();

$eventos = [];
while ($row = $res->fetch_assoc()) {
    // Monta evento no formato que o FullCalendar espera
    $eventos[] = [
        'id'    => $row['id'],
        'title' => $row['cliente'] . ' - ' . $row['servico'] . ' (' . $row['profissional'] . ')',
        'start' => $row['data'] . 'T' . $row['hora'],
        // 'end' => ... pode calcular se tiver duração
        'extendedProps' => [
            'profissional' => $row['profissional'],
            'servico' => $row['servico'],
            'cliente' => $row['cliente']
        ]
    ];
}

header('Content-Type: application/json');
echo json_encode($eventos);
?>
