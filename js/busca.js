let buscadorInput = document.getElementById('buscar');
let searchIcon = document.getElementById('searchIcon');
let clearButton = document.getElementById('clearButton');
let tituloPagina = document.getElementById('titulo-container');

buscadorInput.addEventListener('keyup', function (event) {
    searchIcon.classList.add('hidden');
    clearButton.classList.remove('hidden');

    if (event.key === 'Enter') {
        let termoDeBusca = buscadorInput.value;

        // quando a tecla "Enter" for pressionada, faça uma solicitação AJAX
        buscarProdutos(termoDeBusca).then();

        tituloPagina.innerHTML = `Resultados da Busca por "${termoDeBusca}"`;
    }
});

// Função para buscar produtos
async function buscarProdutos(termo) {
    const resultado = await fetch(`php/get-produtos.php?list=${termo}`, {
        method: "GET"
    });

    const conteudo = await resultado.json();

    const produtosContainer = document.getElementById('produtos');
    produtosContainer.innerHTML = ''; // Limpa a lista de produtos atual

    for (var i = 0; i < conteudo.length; i++) {
        let template =
            `<div class="card">
                <div class="img-prod">
                    <img alt="Foto do produto" src="media/images/${conteudo[i].imagem}"/>
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

        produtosContainer.innerHTML += template;
    }
}

// Função para limpar a busca e reexibir todos os produtos
function limparBusca() {

    // Limpar o input de busca
    buscadorInput.value = '';

    // Exibir o ícone de busca e ocultar o botão de limpar
    searchIcon.classList.remove('hidden');
    clearButton.classList.add('hidden');

    // Reexibir todos os produtos
    buscarProdutos('all').then();
    
    tituloPagina.innerHTML = 'Mostrando Todos os Produtos:';
}
