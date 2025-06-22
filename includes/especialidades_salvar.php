<?php
include_once('conexao.php');

$id = $_POST['id'] ?? null;
$nome = trim($_POST['nome']);

if ($id) {
  $stmt = $pdo->prepare("UPDATE especialidades SET nome = ? WHERE id = ?");
  $stmt->execute([$nome, $id]);
} else {
  $stmt = $pdo->prepare("INSERT INTO especialidades (nome) VALUES (?)");
  $stmt->execute([$nome]);
}

header("Location: especialidades_listar.php");
exit;
