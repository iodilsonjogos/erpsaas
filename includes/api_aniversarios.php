<?php
// api_aniversarios.php
include 'conexao.php';

$mes = isset($_GET['mes']) ? (int)$_GET['mes'] : date('n');
$aniversarios = [];

// Clientes
$res = $conn->prepare("SELECT nome, DAY(data_nascimento) AS dia, 'Cliente' AS tipo FROM clientes WHERE MONTH(data_nascimento) = ?");
if (!$stmt) {
    echo json_encode(['erro' => 'Erro na preparação da consulta: ' . $conn->error]);
    exit;
}
$res->bind_param('i', $mes);
$res->execute();
$r1 = $res->get_result();
while ($row = $r1->fetch_assoc()) $aniversarios[] = $row;

// Profissionais
$res2 = $conn->prepare("SELECT nome, DAY(data_nascimento) AS dia, 'Profissional' AS tipo FROM profissionais WHERE MONTH(data_nascimento) = ?");
$res2->bind_param('i', $mes);
$res2->execute();
$r2 = $res2->get_result();
while ($row = $r2->fetch_assoc()) $aniversarios[] = $row;

// Se quiser incluir colaboradores, repita aqui...

echo json_encode($aniversarios);
