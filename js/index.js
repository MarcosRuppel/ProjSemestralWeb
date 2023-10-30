// construtor dos cards de todos os produtos
window.onload = async function(){


    var resultado = await fetch("php/get-produtos.php?list=all", {
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

// Menu de hamburguer
function toggleMenu() {
    var menu = document.querySelector('.menu');
    var hamburgerIcon = document.getElementById('hamburger-icon');
    var closeIcon = document.getElementById('close-icon');

    if (menu.style.right === '-250px' || menu.style.right === '') {
        menu.style.right = '0';
        hamburgerIcon.style.display = 'none';
        closeIcon.style.display = 'inline-block';
    } else {
        menu.style.right = '-250px';
        hamburgerIcon.style.display = 'inline-block';
        closeIcon.style.display = 'none';
    }
}

