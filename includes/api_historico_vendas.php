<?php
// Arquivo: includes/api_historico_vendas.php

require_once(__DIR__ . '/conexao.php'); // ajuste se necessário

$id_cliente = intval($_GET['id_cliente'] ?? 0);
if ($id_cliente < 1) {
  echo json_encode([]);
  exit;
}

$stmt = $conn->prepare("
    SELECT 
        id, 
        DATE_FORMAT(data_venda, '%d/%m/%Y %H:%i') as data,
        CONCAT('Venda #', id, ' / Valor: R$ ', FORMAT(valor_total, 2, 'pt_BR')) as resumo,
        valor_total as valor
    FROM vendas 
    WHERE cliente_id=? 
    ORDER BY data_venda DESC 
    LIMIT 10
");
if (!$stmt) {
  echo json_encode(['erro' => $conn->error]);
  exit;
}
$stmt->bind_param("i", $id_cliente);
$stmt->execute();
$result = $stmt->get_result();

$vendas = [];
while ($v = $result->fetch_assoc()) {
  $vendas[] = $v;
}
echo json_encode($vendas);
