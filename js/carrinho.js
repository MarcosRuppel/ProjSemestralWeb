// executa ao carregar a página
document.addEventListener('DOMContentLoaded',
    () => {
        updNumItensMenu().then(); // atualiza a quantidade no menu
        loadCart().then(); // carrega o carrinho do banco
    });

// construtor dos cards dos produtos no carrinho
async function loadCart(){
    let resultado = await fetch("../php/get-carrinho.php", {
        method: "GET"
    });
    let conteudo = await resultado.json();

    let carrinho = "";
    let subtotal = 0;
    for(var i = 0; i < conteudo.length; i++) {
        let template =
            `<div class="card-produto">
            <div class="detalhes-produto">
                <div class="img-produto">
                    <img alt="Foto do produto" src="../media/images/${conteudo[i].imagem}">
                </div>
                <p class="nome-prod">${conteudo[i].nome}</p>
                <p class="val-unit">R$<span id="valor-unit">${conteudo[i].preco}</span></p>
                <div class="qtde-produto">
                    <button type="button" class="reduzir-qtd" onclick=reduceFromCart(${conteudo[i].produto_id})>-</button>
                    <span class="qtd">${conteudo[i].quantidade}</span>
                    <button type="button" class="aumentar-qtd" onclick=addToCart(${conteudo[i].produto_id})>+</button>
                </div>
                <p class="total">R$<span id="valor-tot">${conteudo[i].valor_total}</span></p>
                <div class="botao-remover">
                    <button type="button" class="remove-prod" onclick=deleteFromCart(${conteudo[i].produto_id})><i class="fa-solid fa-trash icone-remover"></i></button>
                </div>
            </div>
        </div>`;

        carrinho += template;
        subtotal += parseFloat(conteudo[i].valor_total);
    }
    
    if(carrinho === "") { // caso não haja nada no carrinho
        document.getElementById('carrinho').innerHTML = 
        `<div class="card-produto">
            <div class="detalhes-produto">
                <div class="img-produto"> </div>
                <p class="nome-prod">Não há produtos no carrinho.</p>
                <p class="val-unit"> </p>
                <div class="qtde-produto"> </div>
                <p class="total"> </p>
                <div class="botao-remover"> </div>
            </div>
        </div>`;
    } 
    else {
        document.getElementById('carrinho').innerHTML = carrinho;
    }
    // Atualizar o subtotal no HTML
    document.getElementById('subtotal').textContent = subtotal.toFixed(2); // duas casas decimais
    // Atualizar o valor total (subtotal + frete) no HTML
    const frete = 20.00;
    const total = subtotal+frete;
    document.getElementById('total').textContent = total.toFixed(2);
}

// função de adicionar produtos ao carrinho
async function addToCart(produto_id) {
    let adicionar = await fetch('../php/carrinho.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `add_to_cart=1&produto_id=${produto_id}`,
    });
    const resultado = await adicionar.text();
    mostrarSnackbar(resultado);
    await updNumItensMenu();
    await loadCart();
}

// função de retirar produtos do carrinho
async function deleteFromCart(produto_id) {
    let remover = await fetch('../php/carrinho.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `remove_from_cart=1&produto_id=${produto_id}`,
    });
    const resultado = await remover.text();
    mostrarSnackbar(resultado);
    await updNumItensMenu();
    await loadCart();
}

// função de diminuir a qtd de produtos do carrinho
async function reduceFromCart(produto_id) {
    let remover = await fetch('../php/carrinho.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `reduce_from_cart=1&produto_id=${produto_id}`,
    });
    const resultado = await remover.text();
    mostrarSnackbar(resultado);
    await updNumItensMenu();
    await loadCart();
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
    let s = document.getElementById('snackbar');
    s.innerHTML = mensagem;
    s.className = "show";
    setTimeout(function(){ s.className = s.className.replace("show", ""); }, 3000);
}