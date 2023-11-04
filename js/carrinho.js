// executa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updNumItensMenu(); // atualiza a quantidade no menu
    loadCart(); // carrega o carrinho do banco
});

// construtor dos cards dos produtos no carrinho
async function loadCart(){
    var resultado = await fetch("../php/get-carrinho.php", {
        method: "GET"
    });
    var conteudo = await resultado.json();

    var carrinho = ""; 
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
                <p class="total">R$<span id="valor-tot">${conteudo[i].valor_total}</span></p>
                <div class="botao-remover">
                    <button type="button" class="remove-prod" onclick=removeFromCart(${conteudo[i].produto_id})><i class="fa-solid fa-trash icone-remover"></i></button>
                </div>
            </div>
        </div>`;

        carrinho += template;
    }
    
    if(carrinho == "") { // caso não haja nada no carrinho
        document.getElementById('carrinho').innerHTML = 
        `<div class="card-produto">
            <div class="detalhes-produto">
                <div class="img-produto"></div>
                <p class="nome-prod">Não há produtos no carrinho.</p>
                <p class="val-unit"></p>
                <div class="qtde-produto"></div>
                <p class="total"></p>
                <div class="botao-remover"></div>
            </div>
        </div>`;
    } 
    else {
        document.getElementById('carrinho').innerHTML = carrinho;
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
    loadCart();
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
    loadCart();
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
function mostrarSnackbar(mensagem) {
    s = document.getElementById('snackbar');
    s.innerHTML = mensagem;
    s.className = "show";
    setTimeout(function(){ s.className = s.className.replace("show", ""); }, 3000);
}