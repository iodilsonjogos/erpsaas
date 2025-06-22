<?php
header('Content-Type: application/json');
include_once(__DIR__ . '/conexao.php');
session_start();
$id_clinica = $_SESSION['id_clinica'] ?? 1;

$q = trim($_GET['q'] ?? '');
if (!$q) { echo json_encode([]); exit; }

// Busca nome, telefone, CPF (ajuste os campos se necessário)
$sql = "SELECT id, nome, telefone FROM clientes 
        WHERE id_clinica = ? AND (nome LIKE ? OR telefone LIKE ?)
        ORDER BY nome ASC LIMIT 10";
$stmt = $conn->prepare($sql);
$like = "%$q%";
$stmt->bind_param('iss', $id_clinica, $like, $like);
$stmt->execute();
$res = $stmt->get_result();
$dados = [];
while ($row = $res->fetch_assoc()) {
    $dados[] = $row;
}
echo json_encode($dados);
exit;
?>
