<?php
include __DIR__ . '/conexao.php';

// Dados recebidos
$cliente = $_POST['cliente'];
$profissional_id = $_POST['profissional_id'];
$data = $_POST['data'];
$hora_inicio = $_POST['hora_inicio']; // formato 'HH:MM'
$servicos = $_POST['servicos']; // array de IDs

// 1. Calcular tempo total do atendimento
$placeholders = implode(',', array_fill(0, count($servicos), '?'));
$stmt = $conn->prepare("SELECT id, duracao FROM servicos WHERE id IN ($placeholders)");
$stmt->bind_param(str_repeat('i', count($servicos)), ...$servicos);
$stmt->execute();
$res = $stmt->get_result();

$duracao_total = 0;
while ($row = $res->fetch_assoc()) {
    $duracao_total += (int)$row['duracao'];
}

// Horário de fim
$inicio_dt = new DateTime("$data $hora_inicio");
$fim_dt = clone $inicio_dt;
$fim_dt->modify("+$duracao_total minutes");
$hora_fim = $fim_dt->format('H:i');

// 2. Buscar agendamentos já existentes para o profissional no dia
$stmt = $conn->prepare("SELECT a.id, a.hora 
    FROM agendamentos a 
    WHERE a.profissional_id = ? AND a.data = ?");
$stmt->bind_param("is", $profissional_id, $data);
$stmt->execute();
$res = $stmt->get_result();

$conflito = false;
while ($ag = $res->fetch_assoc()) {
    // Buscar os serviços desse agendamento
    $stmt2 = $conn->prepare("SELECT s.duracao 
        FROM agendamento_servicos ags 
        JOIN servicos s ON s.id = ags.servico_id
        WHERE ags.agendamento_id = ?");
    $stmt2->bind_param("i", $ag['id']);
    $stmt2->execute();
    $result2 = $stmt2->get_result();

    $duracao_existente = 0;
    while ($sx = $result2->fetch_assoc()) {
        $duracao_existente += (int)$sx['duracao'];
    }

    // Monta intervalo ocupado
    $inicio_existente = new DateTime("$data {$ag['hora']}");
    $fim_existente = clone $inicio_existente;
    $fim_existente->modify("+$duracao_existente minutes");

    // Checa sobreposição
    if (($inicio_dt < $fim_existente) && ($fim_dt > $inicio_existente)) {
        $conflito = true;
        break;
    }
}

if ($conflito) {
    echo json_encode([
        'sucesso' => false, 
        'msg' => 'Conflito: esse profissional já tem agendamento nesse horário!'
    ]);
    exit;
}

// 3. Inserir o agendamento e os serviços
$stmt = $conn->prepare("INSERT INTO agendamentos (cliente, profissional_id, data, hora) VALUES (?, ?, ?, ?)");
$stmt->bind_param("siss", $cliente, $profissional_id, $data, $hora_inicio);
if ($stmt->execute()) {
    $agendamento_id = $stmt->insert_id;
    $stmt2 = $conn->prepare("INSERT INTO agendamento_servicos (agendamento_id, servico_id) VALUES (?, ?)");
    foreach ($servicos as $serv_id) {
        $stmt2->bind_param("ii", $agendamento_id, $serv_id);
        $stmt2->execute();
    }
    echo json_encode(['sucesso' => true]);
} else {
    echo json_encode(['sucesso' => false, 'msg' => $conn->error]);
}
