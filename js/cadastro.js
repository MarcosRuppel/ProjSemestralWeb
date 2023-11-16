// executa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updNumItensMenu().then(); // atualiza a quantidade no menu
});

function redirecionarParaNovaPagina() {
    window.location.href = "../login/";
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

// Cadastro de usuário
async function cadastrarUser(){
    // Verificar se o usuário preencheu todos os campos
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const dataNascimento = document.getElementById("data-nascimento").value;
    const senha = document.getElementById("senha").value;
    const botaoRegistrar = document.getElementById("botaoregistrar");
    if (!nome || !email || !dataNascimento || !senha){
        mostrarSnackbar("Por favor, preencha todos os campos.");
    }
    else {
        // Desabilite o botão enquanto o processo está em andamento
        botaoRegistrar.disabled = true;

        const form = document.getElementById("form-cadastro");
        const dados = new FormData(form);
        let promise = await fetch("../php/cadastro.php", {
            method: "POST",
            body: dados
        });
        let resultado = await promise.json();

        if (resultado === "Cadastro realizado com sucesso.") {
            mostrarSnackbar(resultado);
            // Aguarde 2 segundos antes de redirecionar para a página de login
            setTimeout(function () {
                window.location.href = "../login/";
            }, 2000);
        } else {
            botaoRegistrar.disabled = false;
            mostrarSnackbar(resultado);
        }
    }
}

// Notificacao em toast (snackbar)
function mostrarSnackbar(mensagem){
    let s = document.getElementById('snackbar');
    s.innerHTML = mensagem;
    s.className = "show";
    setTimeout(function(){ s.className = s.className.replace("show", ""); }, 3000);
}