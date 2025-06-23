<?php
require_once(__DIR__ . '/conexao.php'); // Ou db.php conforme sua estrutura

$q = trim($_GET['q'] ?? '');

if (strlen($q) < 3) {
    echo json_encode([]);
    exit;
}

$stmt = $conn->prepare("
    SELECT id, nome, telefone, cpf 
    FROM clientes 
    WHERE nome LIKE CONCAT('%', ?, '%')
    OR telefone LIKE CONCAT('%', ?, '%')
    OR cpf LIKE CONCAT('%', ?, '%')
    LIMIT 10
");
if (!$stmt) {
    // DEBUG: Exiba o erro do MySQL (remova isso em produção)
    echo json_encode(['erro' => $conn->error]);
    exit;
}
$stmt->bind_param("sss", $q, $q, $q);
$stmt->execute();
$result = $stmt->get_result();
$clientes = [];
while ($cli = $result->fetch_assoc()) {
    $clientes[] = $cli;
}
echo json_encode($clientes);
