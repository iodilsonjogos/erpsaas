<?php
require_once('../conexao.php');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
  echo json_encode(['success' => false, 'msg' => 'Dados não enviados']);
  exit;
}

// Exemplo de coleta dos campos principais
$id_cliente = $data['id_cliente'];
$itens = $data['itens']; // array com serviços e produtos
$profissional_id = $data['profissional_id'];
$comissao_percentual = $data['comissao_percentual'];
$comissao_valor = $data['comissao_valor'];
$total = $data['total'];
$pagamento = $data['pagamento'];
$obs = $data['obs'] ?? '';
// ... outros campos conforme seu modelo

// 1. Cria venda
$stmt = $conn->prepare("INSERT INTO vendas (cliente_id, profissional_id, valor_total, forma_pagamento, obs) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("iidss", $id_cliente, $profissional_id, $total, $pagamento, $obs);
$stmt->execute();
$id_venda = $stmt->insert_id;

// 2. Grava itens
foreach ($itens as $item) {
  $stmt2 = $conn->prepare("INSERT INTO itens_venda (venda_id, tipo, descricao, quantidade, valor_unitario) VALUES (?, ?, ?, ?, ?)");
  $stmt2->bind_param("issid", $id_venda, $item['tipo'], $item['descricao'], $item['quantidade'], $item['valor_unitario']);
  $stmt2->execute();
}

// 3. Grava comissão
$stmt3 = $conn->prepare("INSERT INTO comissao_profissional (venda_id, profissional_id, percentual, valor) VALUES (?, ?, ?, ?)");
$stmt3->bind_param("iidd", $id_venda, $profissional_id, $comissao_percentual, $comissao_valor);
$stmt3->execute();

echo json_encode(['success' => true, 'msg' => 'Venda salva!', 'id_venda' => $id_venda]);
