<?php
include __DIR__ . '/conexao.php';

header('Content-Type: application/json');

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

$sql = "SELECT s.id, s.nome
        FROM servicos s
        JOIN profissional_servico ps ON ps.servico_id = s.id
        WHERE ps.profissional_id = ?
        ORDER BY s.nome";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

$dados = [];
while ($row = $result->fetch_assoc()) {
    $dados[] = $row;
}
echo json_encode($dados);
