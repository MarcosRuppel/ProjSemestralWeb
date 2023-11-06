<?php
$con = mysqli_connect("localhost:3306", "root", "PUC@1234", "website");

if (mysqli_connect_errno()) {
    echo "Falha na conexão com o banco de dados!";
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    // Verifique se o parâmetro 'produto_id' está definido
    if (isset($_POST['produto_id'])) {
        //id do produto a ser removido
        $produto_id = $_POST['produto_id'];

        $query = "DELETE FROM produto WHERE id = $produto_id";
        if (mysqli_query($con, $query)){
            echo json_encode("Produto removido com sucesso!");
        } else {
            echo json_encode("Falha ao remover produto!");
        }
    } else {
        echo json_encode("ID do produto nao especificado na solicitacao.");
    }
}
?>