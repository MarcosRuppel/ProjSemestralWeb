// executa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updNumItensMenu().then(); // atualiza a quantidade no menu
});

function mostrarSenha() {
    var inputPass = document.getElementById('senha');
    var btnShowPass = document.getElementById('btn-senha');

    if (inputPass.type === 'password') {
        inputPass.type = 'text';
        btnShowPass.querySelector('i').classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        inputPass.type = 'password';
        btnShowPass.querySelector('i').classList.replace('fa-eye-slash', 'fa-eye');
    }
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