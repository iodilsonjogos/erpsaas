<?php
header('Content-Type: application/json');
include_once(__DIR__.'/conexao.php');

$hoje = date('Y-m-d');

$sql = "
SELECT p.id, p.nome, p.foto, p.status,
       COUNT(a.id) AS atendimentos,
       GROUP_CONCAT(a.hora ORDER BY a.hora) AS horarios
FROM profissionais p
LEFT JOIN agendamentos a 
   ON a.profissional_id = p.id 
   AND a.data = ?
GROUP BY p.id, p.nome, p.foto, p.status
ORDER BY p.nome ASC
";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $hoje);
$stmt->execute();
$res = $stmt->get_result();

$profs = [];
while ($row = $res->fetch_assoc()) {
    $profs[] = [
        'id' => $row['id'],
        'nome' => $row['nome'],
        'avatar' => $row['foto'] ?: 'assets/img/avatar_padrao.png',
        'status' => $row['status'],
        'atendimentos' => intval($row['atendimentos']),
        'horarios' => $row['horarios'] ? explode(',', $row['horarios']) : []
    ];
}
echo json_encode($profs);
exit;
?>
