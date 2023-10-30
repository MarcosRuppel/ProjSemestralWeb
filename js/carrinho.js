document.addEventListener('DOMContentLoaded', () => {
    atualizaQtdCarrinho(); // atualiza a quantidade do carrinho ao carregar a página
});

function mostrarSnackbar(mensagem){
    s = document.getElementById('snackbar');
    s.innerHTML = mensagem;
    s.className = "show";
    setTimeout(function(){ s.className = s.className.replace("show", ""); }, 3000);
}

// função de adicionar produtos ao carrinho
async function addToCart(produto_id) {
    var adicionar = await fetch('php/carrinho.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `add_to_cart=1&produto_id=${produto_id}`,
    });
    const resultado = await adicionar.text();
    mostrarSnackbar(resultado);
    atualizaQtdCarrinho();
}

// função de remover produtos do carrinho
async function removeFromCart(produto_id) {
    var remover = await fetch('php/carrinho.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `remove_from_cart=1&produto_id=${produto_id}`,
    });
    const resultado = await remover.text();
    mostrarSnackbar(resultado);
    atualizaQtdCarrinho();
}

// função de recuperar o carrinho do banco
async function getCartItems() {
    await fetch('php/carrinho.php?get_cart=1', {
        method: 'GET',
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
    });
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
async function atualizaQtdCarrinho(){
    const contador = document.getElementById('qtd-carrinho');
    contador.innerHTML = await getCartTotal();
}