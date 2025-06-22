<?php
include_once('conexao.php');

$id = $_GET['id'] ?? null;
if ($id) {
  $pdo->prepare("DELETE FROM especialidades WHERE id = ?")->execute([$id]);
}

header("Location: especialidades_listar.php");
exit;
