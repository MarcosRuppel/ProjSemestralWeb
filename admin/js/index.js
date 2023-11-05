// executa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updNumItensMenu(); // atualiza a quantidade no menu
    loadProducts(); // carrega os cards do banco
});

async function loadProducts(){
    var resultado = await fetch("./admin/php/get-produtos.php", {
        method: "GET"
    });
    var conteudo = await resultado.json();
    var produtos = "";
    for(var i = 0; i < conteudo.length; i++) {

        var template =
        `<div class="card">
            <div class="img-prod">
                <img src="media/images/${conteudo[i].imagem}"/>
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
    if (produtos == ""){
        document.getElementById('produtos').innerHTML =
        `
        `
    }
    else {
        document.getElementById('produtos').innerHTML = produtos;
    }
}
