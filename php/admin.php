<?php
$con = mysqli_connect("localhost:3306", "root", "PUC@1234", "website");

if (mysqli_connect_errno()) {
    echo "Falha na conexão com o banco de dados!";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['add_product'])){
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
    else if (isset($_POST['upd_product'])){
        // Receba os dados do formulário de edição
        $produto_id = $_POST['produto_id'];
        $novo_nome = $_POST['novo_nome'];
        $nova_descricao = $_POST['nova_descricao'];
        $novo_preco = $_POST['novo_preco'];
        $novo_estoque = $_POST['novo_estoque'];

        $query = "UPDATE FROM produto SET (nome ='$novo_nome', descricao='$nova_descricao', preco='$novo_preco', estoque='$novo_estoque') WHERE id = $produto_id;";
        if (mysqli_query($con, $query)){
            echo json_encode("Produto atualizado com sucesso!");
        } else {
            echo json_encode("Falha ao atualizar produto!");
        }
    }
    else if (isset($_POST['del_product'])){
        //id do produto a ser removido
        $produto_id = $POST['produto_id'];

        $query = "DELETE FROM produto WHERE id = $_produto_id";
        if (mysqli_query($con, $query)){
            echo json_encode("Produto removido com sucesso!");
        } else {
            echo json_encode("Falha ao remover produto!");
        }
    }
}
?>
