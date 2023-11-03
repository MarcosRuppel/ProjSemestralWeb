document.addEventListener('DOMContentLoaded', () => {
    updNumItensMenu(); // atualiza a quantidade do carrinho ao carregar a página
});

// construtor dos cards dos produtos no carrinho
window.onload = async function(){

    var resultado = await fetch("../php/get-carrinho.php", {
        method: "GET"
    });

    var conteudo = await resultado.json();

    for(var i = 0; i < conteudo.length; i++) {

        var template =
        `<div class="card-produto">
            <div class="detalhes-produto">
                <div class="img-produto">
                    <img src="../media/images/${conteudo[i].imagem}">
                </div>
                <p class="nome-prod">${conteudo[i].nome}</p>
                <p class="val-unit">R$<span id="valor-unit">${conteudo[i].preco}</span></p>
                <div class="qtde-produto">
                    <button class="reduzir-qtd">-</button>
                    <span class="qtd">${conteudo[i].quantidade}</span>
                    <button class="aumentar-qtd">+</button>
                </div>
                <p class="total">R$<span id="valor-tot">10.00</span></p>
                <div class="botao-remover">
                    <button type="button" class="remove-prod" onclick=removeFromCart(${conteudo[i].produto_id})>Remover</button>
                </div>
            </div>
        </div>`;

        document.getElementById('carrinho').innerHTML += template;
    }
}

// função de adicionar produtos ao carrinho
async function addToCart(produto_id) {
    var adicionar = await fetch('../php/carrinho.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `add_to_cart=1&produto_id=${produto_id}`,
    });
    const resultado = await adicionar.text();
    mostrarSnackbar(resultado);
    updNumItensMenu();
}

// função de remover produtos do carrinho
async function removeFromCart(produto_id) {
    var remover = await fetch('../php/carrinho.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `remove_from_cart=1&produto_id=${produto_id}`,
    });
    const resultado = await remover.text();
    mostrarSnackbar(resultado);
    updNumItensMenu();
}

// função para sincronizar a quantidade de itens no carrinho consultando no BD
async function updNumItensMenu(){
    const contador = document.getElementById('qtd-carrinho');
    contador.innerHTML = await getCartTotal();
}

// função de recuperar a qtde de itens no carrinho
async function getCartTotal() {
    const response = await fetch('../php/carrinho.php?get_total', {
        method: 'GET',
    });

    if (response.ok) {
        const data = await response.json();
        return data.total || 0; // retorna 0 se não houver nada no carrinho
    } else {
        return 0;
    }
}

// Notificacao em toast (snackbar)
function mostrarSnackbar(mensagem){
    s = document.getElementById('snackbar');
    s.innerHTML = mensagem;
    s.className = "show";
    setTimeout(function(){ s.className = s.className.replace("show", ""); }, 3000);
}