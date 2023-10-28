window.onload = async function(){


    var resultado = await fetch("php/get-produtos.php", {
        method: "GET"
    });

    var conteudo = await resultado.json();

    for(var i = 0; i < conteudo.length; i++) {

        var template =
        `<div class="card">
            <div class="img-prod">
                <img src="media/images/${conteudo[i].imagem}"/>
            </div>
            <div class="info-prod">
                <div class="nome-prod">${conteudo[i].nome}</div>
                <div class="specs-prod">${conteudo[i].descricao}</div>
                <div class="preco-prod">R$ ${conteudo[i].preco}</div>
            </div>
            <div class="botao-carrinho">
                <button type="button" onclick="addToCart(${conteudo[i].id})"><i class="fa-solid fa-cart-plus" style="color: #ffffff;"></i>  Adicionar ao carrinho</button>
            </div>
        </div>`;

        document.getElementById('produtos').innerHTML += template;
    }
}


function addToCart(id){
    var dados = new FormData();
    dados.append("id", id);

    fetch("php/comprar.php", {
        method: "POST",
        body: dados
    });
}