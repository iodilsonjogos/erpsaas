<?php
header('Content-Type: application/json');
include_once(__DIR__ . '/conexao.php'); // Ajuste o caminho conforme sua estrutura

// Sempre recupere o id_clinica do contexto do usuário logado!
session_start();
$id_clinica = $_SESSION['id_clinica'] ?? 1; // Troque o padrão '1' pelo seu modelo de multi-clínica

$action = $_GET['action'] ?? $_POST['action'] ?? 'list';

if ($action === 'list') {
    // LISTAR FILA ATUAL
    $sql = "SELECT f.id, f.id_cliente, f.nome_manual, f.servico, f.telefone, f.data_hora_entrada, c.nome AS cliente_nome
            FROM fila_espera f
            LEFT JOIN clientes c ON f.id_cliente = c.id
            WHERE f.id_clinica = ? AND f.status = 'na_fila'
            ORDER BY f.data_hora_entrada ASC";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id_clinica);
    $stmt->execute();
    $result = $stmt->get_result();
    $fila = [];
    while ($row = $result->fetch_assoc()) {
        $fila[] = $row;
    }
    echo json_encode(['success' => true, 'fila' => $fila]);
    exit;
}

if ($action === 'add') {
    // ADICIONAR À FILA
    $id_cliente = $_POST['id_cliente'] ?? null;
    $nome_manual = $_POST['nome_manual'] ?? null;
    $servico = $_POST['servico'] ?? null;
    $telefone = $_POST['telefone'] ?? null;
    $observacao = $_POST['observacao'] ?? null;

    if (empty($id_cliente) && empty($nome_manual)) {
        echo json_encode(['success' => false, 'msg' => 'Informe o cliente ou nome manual.']);
        exit;
    }
    $sql = "INSERT INTO fila_espera 
        (id_clinica, id_cliente, nome_manual, servico, telefone, observacao) 
        VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('iissss', $id_clinica, $id_cliente, $nome_manual, $servico, $telefone, $observacao);
    $ok = $stmt->execute();
    echo json_encode(['success' => $ok, 'msg' => $ok ? 'Adicionado à fila!' : 'Erro ao adicionar.']);
    exit;
}

if ($action === 'remove') {
    // ATENDER OU REMOVER CLIENTE DA FILA
    $id = intval($_POST['id'] ?? 0);
    $tipo = $_POST['tipo'] ?? 'atendido'; // ou 'removido'
    if (!$id) {
        echo json_encode(['success' => false, 'msg' => 'ID inválido.']);
        exit;
    }
    $sql = "UPDATE fila_espera SET status = ?, data_hora_saida = NOW() WHERE id = ? AND id_clinica = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sii', $tipo, $id, $id_clinica);
    $ok = $stmt->execute();
    echo json_encode(['success' => $ok, 'msg' => $ok ? 'Cliente atualizado na fila!' : 'Erro ao atualizar.']);
    exit;
}

// Default: método não suportado
echo json_encode(['success' => false, 'msg' => 'Ação inválida.']);
exit;
?>