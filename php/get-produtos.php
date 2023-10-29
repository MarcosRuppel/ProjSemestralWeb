<?php
$con = mysqli_connect("localhost:3306", "root", "PUC@1234", "website");
$param = $_GET['list'];
$param = mysqli_real_escape_string($con, $param); // para evitar vulnerabilidade SQL Injection


// efetua a busca se houver algum termo recebido por GET
if ($param == 'all') {
    $query = "SELECT * FROM website.produto WHERE (estoque > 0)";
} else {
    $query = "SELECT * FROM website.produto WHERE (estoque > 0) AND (nome LIKE '%$param%' OR descricao LIKE '%$param%')";
}

$resultado = mysqli_query($con, $query);
$dados = array();


while ($registro = mysqli_fetch_assoc($resultado)) {
    array_push($dados, $registro);
}

$json = json_encode($dados);
echo $json;
?>