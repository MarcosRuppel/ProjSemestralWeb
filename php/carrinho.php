<?php

$con = mysqli_connect("localhost:3306", "root", "PUC@1234", "website");

if (mysqli_connect_errno()) {
    echo "Falha na conexão com o banco de dados: " . mysqli_connect_error();
    exit;
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Adicionar produto ao carrinho
    if (isset($_POST['add_to_cart'])) {
        $produto_id = $_POST['produto_id'];
        
        // Verificar se o produto já está no carrinho (no banco de dados)
        $query = "SELECT * FROM carrinho WHERE produto_id = $produto_id";
        $result = mysqli_query($con, $query);
        
        if (mysqli_num_rows($result) > 0) {
            // Atualize a quantidade se o produto já estiver no carrinho
            $updateQuery = "UPDATE carrinho SET quantidade = quantidade + 1 WHERE produto_id = $produto_id";
            if (mysqli_query($con, $updateQuery)){
                echo json_encode("Quantidade atualizada com sucesso no carrinho.");
            } else {
                echo json_encode("Falha ao atualizar a quantidade do produto no carrinho: " . mysqli_error($con));
            }
        } else {
            // Insira o produto no carrinho se não estiver lá
            $insertQuery = "INSERT INTO carrinho (produto_id, quantidade) VALUES ($produto_id, 1)";
            if (mysqli_query($con, $insertQuery)){
                echo json_encode("Produto adicionado com sucesso ao carrinho.");
            } else {
                echo json_encode("Falha ao adicionar o produto ao carrinho: " . mysqli_error($con));
            };
        }
        
        mysqli_close($con);
    }
    
    // Remover produto do carrinho
    elseif (isset($_POST['remove_from_cart'])) {
        $produto_id = $_POST['produto_id'];
    
        // Remover o produto do carrinho no banco de dados
        $deleteQuery = "DELETE FROM carrinho WHERE produto_id = $produto_id";
        if (mysqli_query($con, $deleteQuery)){
            echo json_encode("Produto removido com sucesso do carrinho.");
        } else {
            echo json_encode("Falha ao remover o produto do carrinho: " . mysqli_error($con));
        };
    
        mysqli_close($con);
    }
    
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obter carrinho (retornar em formato JSON)
    if (isset($_GET['get_cart'])) {
        $cartData = array();
    
        // Consulta para obter os produtos no carrinho
        $query = "SELECT carrinho.produto_id, produto.nome, carrinho.quantidade, produto.preco FROM carrinho INNER JOIN produto ON carrinho.produto_id = produto.id";
        $result = mysqli_query($con, $query);
    
        while ($row = mysqli_fetch_assoc($result)) {
            $cartData[] = $row;
        }
    
        echo json_encode($cartData);
    
        mysqli_close($con);
    }

    // Retornar a quantidade de itens
    if (isset($_GET['get_total'])) {
        // Consulta para obter a quantidade total no carrinho
        $query = "SELECT SUM(carrinho.quantidade) AS total FROM carrinho";
        $result = mysqli_query($con, $query);

        if ($result) {
            $row = mysqli_fetch_assoc($result);
            echo json_encode($row);
        } else {
            // Se houver um erro na consulta, retorne uma mensagem de erro
            echo json_encode(array('error' => 'Erro ao obter a quantidade total do carrinho.'));
        }

        mysqli_close($con);
    }
    
}
