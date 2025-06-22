<?php
include_once('conexao.php');

$id = $_POST['id'] ?? null;

$nome = $_POST['nome'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$documento = preg_replace('/\D/', '', $_POST['documento']);
$tipo_doc = strlen($documento) == 11 ? 'CPF' : 'CNPJ';
$data_nascimento = $_POST['data_nascimento'];
$genero = $_POST['genero'];
$disponibilidade = $_POST['disponibilidade'];
$cep = $_POST['cep'];
$endereco = $_POST['endereco'];
$numero = $_POST['numero'];
$complemento = $_POST['complemento'];
$bairro = $_POST['bairro'];
$cidade = $_POST['cidade'];
$uf = $_POST['uf'];
$especialidades = $_POST['especialidades'] ?? [];

$foto = $_FILES['foto']['name'];
if ($foto) {
  $foto_nome = time() . '_' . basename($foto);
  move_uploaded_file($_FILES['foto']['tmp_name'], "../assets/img/profissionais/" . $foto_nome);
} else {
  $foto_nome = null;
}

if ($id) {
  // Atualiza
  $sql = "UPDATE profissionais SET nome=?, email=?, telefone=?, documento=?, tipo_doc=?, data_nascimento=?, genero=?, disponibilidade=?, cep=?, endereco=?, numero=?, complemento=?, bairro=?, cidade=?, uf=?";
  $params = [$nome, $email, $telefone, $documento, $tipo_doc, $data_nascimento, $genero, $disponibilidade, $cep, $endereco, $numero, $complemento, $bairro, $cidade, $uf];

  if ($foto_nome) {
    $sql .= ", foto=?";
    $params[] = $foto_nome;
  }

  $sql .= " WHERE id=?";
  $params[] = $id;

  $pdo->prepare($sql)->execute($params);

  // Atualiza especialidades
  $pdo->prepare("DELETE FROM profissional_especialidade WHERE profissional_id = ?")->execute([$id]);
  foreach ($especialidades as $esp_id) {
    $pdo->prepare("INSERT INTO profissional_especialidade (profissional_id, especialidade_id) VALUES (?, ?)")->execute([$id, $esp_id]);
  }
} else {
  // Insere
  $stmt = $pdo->prepare("INSERT INTO profissionais (nome, email, telefone, documento, tipo_doc, data_nascimento, genero, disponibilidade, cep, endereco, numero, complemento, bairro, cidade, uf, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  $stmt->execute([$nome, $email, $telefone, $documento, $tipo_doc, $data_nascimento, $genero, $disponibilidade, $cep, $endereco, $numero, $complemento, $bairro, $cidade, $uf, $foto_nome]);
  $novo_id = $pdo->lastInsertId();

  foreach ($especialidades as $esp_id) {
    $pdo->prepare("INSERT INTO profissional_especialidade (profissional_id, especialidade_id) VALUES (?, ?)")->execute([$novo_id, $esp_id]);
  }
}

header("Location: ../modulos/profissionais.php");
exit;
