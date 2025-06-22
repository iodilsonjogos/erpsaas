<?php
include_once('conexao.php');

// Pega os dados se for edição
$id = $_GET['id'] ?? null;
$dados = $id ? $pdo->query("SELECT * FROM profissionais WHERE id = $id")->fetch(PDO::FETCH_ASSOC) : null;

// Carrega todas as especialidades
$especialidades = $pdo->query("SELECT * FROM especialidades ORDER BY nome")->fetchAll(PDO::FETCH_ASSOC);

// Carrega as especialidades já vinculadas
$selecionadas = [];
if ($id) {
  $res = $pdo->query("SELECT especialidade_id FROM profissional_especialidade WHERE profissional_id = $id")->fetchAll(PDO::FETCH_ASSOC);
  $selecionadas = array_column($res, 'especialidade_id');
}
?>

<form action="salvar_profissional.php" method="post" enctype="multipart/form-data">
  <input type="hidden" name="id" value="<?= $id ?>">

  <label>Nome</label>
  <input type="text" name="nome" class="form-control" value="<?= $dados['nome'] ?? '' ?>" required>

  <label>Email</label>
  <input type="email" name="email" class="form-control" value="<?= $dados['email'] ?? '' ?>">

  <label>Telefone</label>
  <input type="text" name="telefone" class="form-control" value="<?= $dados['telefone'] ?? '' ?>">

  <label>Documento</label>
  <input type="text" name="documento" class="form-control" value="<?= $dados['documento'] ?? '' ?>" required>

  <label>Data de Nascimento</label>
  <input type="date" name="data_nascimento" class="form-control" value="<?= $dados['data_nascimento'] ?? '' ?>">

  <label>Gênero</label>
  <select name="genero" class="form-control">
    <option <?= @$dados['genero'] == 'Masculino' ? 'selected' : '' ?>>Masculino</option>
    <option <?= @$dados['genero'] == 'Feminino' ? 'selected' : '' ?>>Feminino</option>
    <option <?= @$dados['genero'] == 'Outro' ? 'selected' : '' ?>>Outro</option>
    <option <?= @$dados['genero'] == 'Prefiro não dizer' ? 'selected' : '' ?>>Prefiro não dizer</option>
  </select>

  <label>Disponibilidade</label>
  <select name="disponibilidade" class="form-control">
    <option <?= @$dados['disponibilidade'] == 'Manhã' ? 'selected' : '' ?>>Manhã</option>
    <option <?= @$dados['disponibilidade'] == 'Tarde' ? 'selected' : '' ?>>Tarde</option>
    <option <?= @$dados['disponibilidade'] == 'Full time' ? 'selected' : '' ?>>Full time</option>
  </select>

  <label>Especialidades</label>
  <select name="especialidades[]" class="form-control" multiple>
    <?php foreach ($especialidades as $esp): ?>
      <option value="<?= $esp['id'] ?>" <?= in_array($esp['id'], $selecionadas) ? 'selected' : '' ?>>
        <?= $esp['nome'] ?>
      </option>
    <?php endforeach; ?>
  </select>

  <label>CEP</label>
  <input type="text" name="cep" class="form-control" value="<?= $dados['cep'] ?? '' ?>">

  <label>Endereço</label>
  <input type="text" name="endereco" class="form-control" value="<?= $dados['endereco'] ?? '' ?>">

  <label>Número</label>
  <input type="text" name="numero" class="form-control" value="<?= $dados['numero'] ?? '' ?>">

  <label>Complemento</label>
  <input type="text" name="complemento" class="form-control" value="<?= $dados['complemento'] ?? '' ?>">

  <label>Bairro</label>
  <input type="text" name="bairro" class="form-control" value="<?= $dados['bairro'] ?? '' ?>">

  <label>Cidade</label>
  <input type="text" name="cidade" class="form-control" value="<?= $dados['cidade'] ?? '' ?>">

  <label>UF</label>
  <input type="text" name="uf" class="form-control" value="<?= $dados['uf'] ?? '' ?>">

  <label>Foto</label>
  <?php if (!empty($dados['foto'])): ?>
    <div><img src="../assets/img/profissionais/<?= $dados['foto'] ?>" width="100"></div>
  <?php endif; ?>
  <input type="file" name="foto" class="form-control">

  <br>
  <button type="submit" class="btn btn-success">Salvar</button>
</form>
