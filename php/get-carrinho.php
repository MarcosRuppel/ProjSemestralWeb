<?php
$con = mysqli_connect("localhost:3306", "root", "PUC@1234", "website");

$query = "SELECT carrinho.produto_id, carrinho.quantidade, carrinho.valor_total, produto.nome, produto.preco, produto.imagem FROM carrinho INNER JOIN produto ON carrinho.produto_id = produto.id;";


$resultado = mysqli_query($con, $query);
$dados = array();


while ($registro = mysqli_fetch_assoc($resultado)) {
    array_push($dados, $registro);
}

mysqli_close($con);

$json = json_encode($dados);
echo $json;
?>