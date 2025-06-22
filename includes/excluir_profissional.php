<?php
include_once('conexao.php');

$id = $_GET['id'] ?? null;

if ($id) {
  $pdo->prepare("DELETE FROM profissionais WHERE id = ?")->execute([$id]);
}

header("Location: ../modulos/profissionais.php");
exit;
