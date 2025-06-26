<?php
require_once(__DIR__ . '/conexao.php');

// Filtros via GET, compatíveis com os módulos antigos e o novo
$cliente = trim($_GET['cliente'] ?? '');
$data = trim($_GET['data'] ?? '');
$prof = intval($_GET['profissional'] ?? 0);

// Montagem dinâmica dos filtros
$where = [];
$params = [];
$types = '';

if ($cliente) {
    $where[] = "c.nome LIKE ?";
    $params[] = "%$cliente%";
    $types .= 's';
}
if ($data) {
    $where[] = "a.data = ?";
    $params[] = $data;
    $types .= 's';
}
if ($prof) {
    $where[] = "a.profissional_id = ?";
    $params[] = $prof;
    $types .= 'i';
}
$whereSQL = $where ? 'WHERE ' . implode(' AND ', $where) : '';

// Suporte a múltiplos serviços no mesmo agendamento (por meio de GROUP_CONCAT)
$sql = "SELECT 
            a.id, 
            IFNULL(c.nome, a.cliente) AS cliente, 
            p.nome AS profissional, 
            GROUP_CONCAT(s.nome SEPARATOR ', ') AS servicos, 
            GROUP_CONCAT(s.valor SEPARATOR ', ') AS valores, 
            a.valor AS valor_total,
            a.data, a.hora, a.obs
        FROM agendamentos a
        LEFT JOIN clientes c ON a.cliente = c.id OR a.cliente = c.nome
        LEFT JOIN profissionais p ON a.profissional_id = p.id
        LEFT JOIN agendamento_servicos ags ON ags.agendamento_id = a.id
        LEFT JOIN servicos s ON s.id = ags.servico_id
        $whereSQL
        GROUP BY a.id
        ORDER BY a.data DESC, a.hora DESC";

$stmt = $conn->prepare($sql);
if ($types) $stmt->bind_param($types, ...$params);
$stmt->execute();
$result = $stmt->get_result();

$agendamentos = [];
while ($row = $result->fetch_assoc()) {
    // Para exibir na tabela, podemos mostrar apenas o primeiro serviço e valor, 
    // ou todos, conforme necessidade.
    $row['servico'] = $row['servicos']; // compatível com front antigo
    $row['valor'] = $row['valor_total'] ?? $row['valores'];
    $agendamentos[] = $row;
}
header('Content-Type: application/json');
echo json_encode($agendamentos);
