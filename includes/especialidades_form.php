<?php
include_once('conexao.php');

$id = $_GET['id'] ?? null;
$registro = null;

if ($id) {
  $registro = $pdo->query("SELECT * FROM especialidades WHERE id = $id")->fetch(PDO::FETCH_ASSOC);
}
?>

<h2><?= $id ? 'Editar' : 'Nova' ?> Especialidade</h2>

<form action="especialidades_salvar.php" method="post">
  <input type="hidden" name="id" value="<?= $id ?>">

  <label>Nome da Especialidade</label>
  <input type="text" name="nome" class="form-control" required value="<?= $registro['nome'] ?? '' ?>">

  <br>
  <button type="submit" class="btn btn-success">Salvar</button>
  <a href="especialidades_listar.php" class="btn btn-secondary">Voltar</a>
</form>
