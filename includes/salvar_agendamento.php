<?php
include __DIR__ . '/conexao.php';

// Receber POST tradicional OU JSON
$data = $_POST;
if (empty($data)) {
    $data = json_decode(file_get_contents('php://input'), true);
}

$cliente = $data['cliente'] ?? ($data['id_cliente'] ?? '');
$profissional_id = $data['profissional_id'] ?? '';
$data_ag = $data['data'] ?? '';
$hora_inicio = $data['hora'] ?? ($data['hora_inicio'] ?? '');
$servicos = $data['servicos'] ?? (isset($data['servico_id']) ? [$data['servico_id']] : []);
$usuario_id = $data['usuario_id'] ?? null;
$valor = isset($data['valor']) ? $data['valor'] : null;
$obs = $data['obs'] ?? null;

// 1. Calcular tempo total do atendimento
if (!is_array($servicos)) $servicos = [$servicos];
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
$inicio_dt = new DateTime("$data_ag $hora_inicio");
$fim_dt = clone $inicio_dt;
$fim_dt->modify("+$duracao_total minutes");
$hora_fim = $fim_dt->format('H:i');

// 2. Buscar agendamentos já existentes para o profissional no dia
$stmt = $conn->prepare("SELECT a.id, a.hora 
    FROM agendamentos a 
    WHERE a.profissional_id = ? AND a.data = ?");
$stmt->bind_param("is", $profissional_id, $data_ag);
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
    $inicio_existente = new DateTime("$data_ag {$ag['hora']}");
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
// Novo: inclui usuario_id e valor (opcionais), obs (opcional)
$sql = "INSERT INTO agendamentos (cliente, profissional_id, data, hora, usuario_id, valor, obs) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "sissids",
    $cliente,
    $profissional_id,
    $data_ag,
    $hora_inicio,
    $usuario_id,
    $valor,
    $obs
);
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
