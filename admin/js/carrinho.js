// executa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updNumItensMenu(); // atualiza a quantidade no menu
    loadCart(); // carrega o carrinho do banco
});

// construtor dos cards dos produtos no carrinho
async function loadCart(){
    var resultado = await fetch("./admin/php/get-carrinho.php", {
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