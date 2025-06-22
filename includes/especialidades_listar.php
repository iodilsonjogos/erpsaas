<?php
include_once('conexao.php');
$dados = $pdo->query("SELECT * FROM especialidades ORDER BY nome")->fetchAll(PDO::FETCH_ASSOC);
?>

<h2>Especialidades</h2>
<a href="especialidades_form.php" class="btn btn-primary">+ Nova Especialidade</a>
<table class="table table-striped mt-3">
  <thead>
    <tr>
      <th>Nome</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    <?php foreach ($dados as $linha): ?>
      <tr>
        <td><?= $linha['nome'] ?></td>
        <td>
          <a href="especialidades_form.php?id=<?= $linha['id'] ?>" class="btn btn-sm btn-warning">Editar</a>
          <a href="especialidades_excluir.php?id=<?= $linha['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Excluir?')">Excluir</a>
        </td>
      </tr>
    <?php endforeach; ?>
  </tbody>
</table>
