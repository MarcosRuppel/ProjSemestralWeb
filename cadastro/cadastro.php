<?php
// Conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "PUC@1234";
$dbname = "website";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão ao banco de dados falhou! ");
}

// Recupere os dados do formulário
$nome = $_POST['nome'];
$email = $_POST['email'];
$data_nascimento = $_POST['data_nasc'];
$senha = $_POST['senha'];

// Insira os dados no banco de dados (use uma consulta preparada para segurança)
$sql = "INSERT INTO cliente (nome, data_nasc, email, senha) VALUES ($nome, $data_nascimento, $email, $senha)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nome, $data_nascimento,$email, $senha);

if ($stmt->execute()) {
    echo "Cadastro realizado com sucesso!";
} else {
    echo "Erro ao cadastrar: " . $stmt->error;
}

$stmt->close();
$conn->close();
