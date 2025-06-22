<?php
include_once(__DIR__ . '/conexao.php');
$profissionais = $pdo->query("SELECT * FROM profissionais ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
?>

<h2>Profissionais</h2>
<a href="../includes/form_cadastrar_profissionais.php" class="btn btn-primary">+ Novo Profissional</a>

<table class="table table-striped mt-3">
  <thead>
    <tr>
      <th>Foto</th>
      <th>Nome</th>
      <th>Especialidade</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    <?php foreach ($profissionais as $p): ?>
      <tr>
        <td><img src="../assets/img/profissionais/<?= $p['foto'] ?: 'semfoto.jpg' ?>" width="50"></td>
        <td><?= $p['nome'] ?></td>
        <td><?= $p['especialidade'] ?></td>
        <td>
          <a href="../includes/form_cadastrar_profissionais.php?id=<?= $p['id'] ?>" class="btn btn-sm btn-warning">Editar</a>
          <a href="../includes/excluir_profissional.php?id=<?= $p['id'] ?>" class="btn btn-sm btn-danger" onclick="return confirm('Deseja excluir?')">Excluir</a>
        </td>
      </tr>
    <?php endforeach; ?>
  </tbody>
</table>
