// executa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updNumItensMenu().then(); // atualiza a quantidade no menu
    loadProducts().then(); // carrega os cards do banco
});

async function loadProducts(){
    let resultado = await fetch("php/get-produtos.php?list=all", {
        method: "GET"
    });
    let conteudo = await resultado.json();
    let produtos = "";
    for(var i = 0; i < conteudo.length; i++) {

        let template =
            `<div class="card">
            <div class="img-prod">
                <img alt="Foto do produto" src="media/images/${conteudo[i].imagem}"/>
            </div>
            <div class="info-prod">
                <div class="nome-desc">
                    <div class="nome-prod">${conteudo[i].nome}</div>
                    <div class="specs-prod">${conteudo[i].descricao}</div>
                </div>
                <div class="preco-prod">R$ ${conteudo[i].preco}</div>
            </div>
            <div class="botao-carrinho">
                <button type="button" onclick="addToCart(${conteudo[i].id})"><i class="fa-solid fa-cart-plus" style="color: #ffffff;"></i>  Adicionar ao carrinho</button>
            </div>
        </div>`;

        produtos += template;
    }
    if (produtos === ""){
        document.getElementById('produtos').innerHTML =
        `
        `
    }
    else {
        document.getElementById('produtos').innerHTML = produtos;
    }
}

// Notificacao em toast (snackbar)
function mostrarSnackbar(mensagem){
    let s = document.getElementById('snackbar');
    s.innerHTML = mensagem;
    s.className = "show";
    setTimeout(function(){ s.className = s.className.replace("show", ""); }, 3000);
}

// função de adicionar produtos ao carrinho
async function addToCart(produto_id) {
    let adicionar = await fetch('php/carrinho.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `add_to_cart=1&produto_id=${produto_id}`,
    });
    const resultado = await adicionar.text();
    mostrarSnackbar(resultado);
    await updNumItensMenu();
}

// função de recuperar a qtde de itens no carrinho
async function getCartTotal() {
    const response = await fetch('php/carrinho.php?get_total', {
        method: 'GET',
    });

    if (response.ok) {
        const data = await response.json();
        return data.total || 0; // retorna 0 se não houver nada no carrinho
    } else {
        return 0;
    }
}

// função para sincronizar a quantidade de itens no carrinho consultando no BD
async function updNumItensMenu(){
    const contador = document.getElementById('qtd-carrinho');
    contador.innerHTML = await getCartTotal();
}