<?php
// includes/conexao.php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "erpsaas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

try {
    $pdo = new PDO("mysql:host=localhost;dbname=erpsaas;charset=utf8", "root", "");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    die("Erro ao conectar: " . $e->getMessage());
}