<?php
include __DIR__ . '/conexao.php';

header('Content-Type: application/json');

// Filtro opcional para clinica_id no futuro (SaaS!)
$sql = "SELECT id, nome FROM profissionais ORDER BY nome";
$result = $conn->query($sql);

$dados = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $dados[] = [
            'id' => $row['id'],
            'nome' => $row['nome']
        ];
    }
}
echo json_encode($dados);
