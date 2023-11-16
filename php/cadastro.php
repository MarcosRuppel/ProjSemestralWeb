<?php
// Recupere os dados do formulário
$nome = $_POST["nome"];
$email = $_POST["email"];
$data_nascimento = date("Y-m-d", strtotime($_POST["data-nascimento"]));
$senha = $_POST["senha"];


// Conexão com o banco de dados
$conn = mysqli_connect("localhost:3306", "root", "PUC@1234", "website");

if (!$conn) {
    $resposta = "Conexão ao banco de dados falhou!";
}
else {
    // Insira os dados no banco de dados (use uma consulta preparada para segurança)
    $query = "INSERT INTO cliente (nome, data_nasc, email, senha) VALUES ('$nome', '$data_nascimento', '$email', '$senha')";
    if (mysqli_query($conn, $query)){
        $resposta = "Cadastro realizado com sucesso.";
    }
    else {
        $resposta = "Erro ao executar a query!";
    }
}
mysqli_close($conn);
echo json_encode($resposta);
?>