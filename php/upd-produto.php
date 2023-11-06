<?php
$con = mysqli_connect("localhost:3306", "root", "PUC@1234", "website");

if (mysqli_connect_errno()) {
    echo "Falha na conexão com o banco de dados!";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verifique se o parâmetro 'produto_id' está definido
    if (isset($_POST['produto_id'])) {
        // Receba os dados do formulário de edição
        $produto_id = $_POST['produto_id'];
        $novo_nome = $_POST['novo_nome'];
        $nova_descricao = $_POST['nova_descricao'];
        $novo_preco = $_POST['novo_preco'];
        $novo_estoque = $_POST['novo_estoque'];

        $query = "UPDATE produto SET nome='$novo_nome', descricao='$nova_descricao', preco='$novo_preco', estoque='$novo_estoque' WHERE id = $produto_id";
        if (mysqli_query($con, $query)){
            echo json_encode("Produto atualizado com sucesso!");
        } else {
            echo json_encode("Falha ao atualizar produto!");
        }
    } else {
        echo json_encode("ID do produto nao especificado na solicitacao.");
    }
}
?>