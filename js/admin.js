// executa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updNumItensMenu().then(); // atualiza a quantidade no menu
    loadProducts().then();
});

async function loadProducts(){
    let resultado = await fetch("../php/get-produtos.php?list=all", {
        method: "GET"
    });
    let conteudo = await resultado.json();
    let produtos = "";
    for(var i = 0; i < conteudo.length; i++) {
        let template =
            `<div class="card">
            <div class="img-prod">
                <img alt="Foto do produto" src="../media/images/${conteudo[i].imagem}"/>
            </div>
            <div class="info-prod">
                <form id="form-produtos-${conteudo[i].id}">
                    <input type="text" class="nome-prod" id="nome-prod-${conteudo[i].id}" name="novo_nome" value="${conteudo[i].nome}" placeholder="Nome">
                    <input type="text" class="desc-prod" id="desc-prod-${conteudo[i].id}" name="nova_descricao" value="${conteudo[i].descricao}" placeholder="Descrição">
                    <input type="number" class="preco-prod" id="preco-prod-${conteudo[i].id}" name="novo_preco" value="${conteudo[i].preco}" placeholder="Preço unit.">
                    <input type="number" class="estoque-prod" id="estoque-prod-${conteudo[i].id}" name="novo_estoque" value="${conteudo[i].estoque}" placeholder="Qtd estoque">
                </form>
            </div>
            <div class="botoes-card">
                <button type="button" id="botaomodificar-${conteudo[i].id}" onclick="updProd(${conteudo[i].id})">Modificar</button>
                <button type="button" id="botaoremover-${conteudo[i].id}" onclick="delProd(${conteudo[i].id})">Remover</button>
            </div>
        </div>`;

        produtos += template;
    }
    if (produtos === ""){
        document.getElementById('produtos').innerHTML = `
        `
    }
    else {
        document.getElementById('produtos').innerHTML = produtos;
    }
}

async function updProd(id){
    // Verificar se o usuário preencheu todos os campos
    const nome = document.getElementById(`nome-prod-${id}`).value;
    const desc = document.getElementById(`desc-prod-${id}`).value;
    const preco = document.getElementById(`preco-prod-${id}`).value;
    const estoque = document.getElementById(`estoque-prod-${id}`).value;
    const botaoModificar = document.getElementById(`botaomodificar-${id}`);
    if (!nome || !desc || !preco || !estoque){
        mostrarSnackbar("Por favor, preencha todos os campos.");
    }
    else {
        // Desabilite o botão enquanto o processo está em andamento
        botaoModificar.disabled = true;

        const form = document.getElementById(`form-produtos-${id}`);
        const dados = new FormData(form);
        dados.append('produto_id', id);
        let atualizar = await fetch('../php/upd-produto.php', {
            method: 'POST',
            body: dados
        });
        let resultado = await atualizar.json();

        if (resultado === "Produto atualizado com sucesso!") {
            mostrarSnackbar(resultado);
            // Aguarde 2 segundos antes de redirecionar para a página de login
            setTimeout(function () {
                loadProducts();
            }, 2000);
        } else {
            botaoModificar.disabled = false;
            mostrarSnackbar(resultado);
        }
    }
}

async function delProd(id){
    const botaoRemover = document.getElementById(`botaoremover-${id}`);
    botaoRemover.disabled = true;
    let remover = await fetch('../php/del-produto.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `produto_id=${id}`,
    });
    let resultado = await remover.json();
    if (resultado === "Produto removido com sucesso!") {
        mostrarSnackbar(resultado);
        // Aguarde 2 segundos antes de redirecionar para a página de login
        setTimeout(function () {
            loadProducts();
        }, 2000);
    } else {
        botaoRemover.disabled = false;
        mostrarSnackbar(resultado);
    }
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

// função para sincronizar a quantidade de itens no carrinho consultando no BD
async function updNumItensMenu(){
    const contador = document.getElementById('qtd-carrinho');
    contador.innerHTML = await getCartTotal();
}

// Notificacao em toast (snackbar)
function mostrarSnackbar(mensagem) {
    let s = document.getElementById('snackbar');
    s.innerHTML = mensagem;
    s.className = "show";
    setTimeout(function(){ s.className = s.className.replace("show", ""); }, 3000);
}