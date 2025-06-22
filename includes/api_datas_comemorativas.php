<?php
header('Content-Type: application/json');

// 1. Parâmetros vindos do front-end (mini calendário)
$ano = isset($_GET['ano']) ? intval($_GET['ano']) : date('Y');
$mes = isset($_GET['mes']) ? intval($_GET['mes']) : date('n');

// 2. (Exemplo) Conexão com banco para buscar estado/cidade
// *** Troque para sua lógica! Exemplo para MySQLi ***
include_once('../conexao.php'); // ajuste caminho se necessário

// Exemplo: buscar dados do cadastro da clínica
$sql = "SELECT estado, cidade FROM configuracoes LIMIT 1";
$res = $conn->query($sql);
if ($res && $res->num_rows > 0) {
    $row = $res->fetch_assoc();
    $estado = $row['estado'] ?: 'RN'; // default SP se não existir
    $cidade = $row['cidade'] ?: 'Natal';
} else {
    $estado = 'RN'; // default se não achar nada
    $cidade = 'Natal';
}

// 3. BUSCA FERIADOS DA BRASILAPI (dinâmico pelo cadastro)
function curl_get($url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 6);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

$feriados = [];
$url = "https://brasilapi.com.br/api/feriados/v1/{$ano}?estado=" . urlencode($estado) . "&cidade=" . urlencode($cidade);
$resp = curl_get($url);
if ($resp) {
    $todosFeriados = json_decode($resp, true);
    if (is_array($todosFeriados)) {
        foreach ($todosFeriados as $feriado) {
            // Filtro do mês atual
            $dataParts = explode('-', $feriado['date']);
            if (count($dataParts) === 3 && intval($dataParts[1]) == $mes) {
                // Classificação de tipo
                $tipo = 'comemorativo';
                if (isset($feriado['type'])) {
                    if ($feriado['type'] == 'national') $tipo = 'feriado_nacional';
                    elseif ($feriado['type'] == 'state') $tipo = 'feriado_estadual';
                    elseif ($feriado['type'] == 'municipal') $tipo = 'feriado_municipal';
                }
                $feriados[] = [
                    'dia' => intval($dataParts[2]),
                    'nome' => $feriado['name'],
                    'tipo' => $tipo
                ];
            }
        }
    }
}

// 4. EVENTOS DO BANCO (comemorativos locais cadastrados)
$comemorativos = [];
// Exemplo: adapte para sua tabela de comemorativos
$sql2 = "SELECT DAY(data) AS dia, nome FROM datas_comemorativas WHERE MONTH(data) = $mes";
$res2 = $conn->query($sql2);
if ($res2 && $res2->num_rows > 0) {
    while($row2 = $res2->fetch_assoc()) {
        $comemorativos[] = [
            'dia' => intval($row2['dia']),
            'nome' => $row2['nome'],
            'tipo' => 'comemorativo'
        ];
    }
}

// 5. Junta tudo e retorna JSON
$todos = array_merge($feriados, $comemorativos);
echo json_encode($todos);
exit;
?>
