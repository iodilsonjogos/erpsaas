<?php
include_once(__DIR__ . '/conexao.php');

// Data de hoje (YYYY-MM-DD)
$hoje = date('Y-m-d');
// echo date('d/m/Y', strtotime($hoje)); // Formata a data para exibição, (d-m-y)

// Consulta SQL para buscar nome + total de atendimentos no dia
$sql = "SELECT p.nome, p.id, COUNT(a.id) AS atendimentos
        FROM profissionais p
        LEFT JOIN agendamentos a 
            ON a.profissional_id = p.id
            AND a.data = ?
        GROUP BY p.id, p.nome
        ORDER BY p.nome ASC";

$stmt = $pdo->prepare($sql);
$stmt->execute([$hoje]);
$profissionais = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<div class="profissionais-dia card-painel">
    <h3>Profissionais - Hoje</h3>
    <div class="status-group grupo-disponivel">
</div>
