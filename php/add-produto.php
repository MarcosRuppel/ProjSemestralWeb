<?php
$con = mysqli_connect("localhost:3306", "root", "PUC@1234", "website");

if (mysqli_connect_errno()) {
    echo "Falha na conexão com o banco de dados!";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //Receba os dados do produto adicionado
    $nome = $_POST['nome'];
    $descricao = $_POST['descricao'];
    $preco = $_POST['preco'];
    $estoque = $_POST['estoque'];
    $imagem = $_POST['imagem'];
    
    $query = "INSERT INTO produto (nome, descricao, preco, estoque, imagem) VALUES ('$nome', '$descricao', '$preco', '$estoque', '$imagem');";
    if (mysqli_query($con, $query)){
        echo json_encode("Produto adicionado com sucesso.");
    } else {
        echo json_encode("Falha ao adicionar produto!");
    }
}
?>
