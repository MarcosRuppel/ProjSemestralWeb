<?php
$con = mysqli_connect("localhost:3306", "root", "PUC@1234", "website");
$resultado = mysqli_query($con, "SELECT * FROM website.produto WHERE (estoque > 0);");
$dados = array();

while ($registro = mysqli_fetch_assoc($resultado)) {
    array_push($dados, $registro);
}

$json = json_encode($dados);
echo $json;
?>