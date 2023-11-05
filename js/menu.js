// Menu de hamburger
function toggleMenu() {
    let menu = document.querySelector('.menu');
    let menuItems = document.querySelectorAll('.menu li');
    let hamburgerIcon = document.getElementById('hamburger-icon');
    let closeIcon = document.getElementById('close-icon');

    if (menu.style.width === '0px' || menu.style.width === '') {
        menu.style.boxShadow = '-5px 5px 10px 5px rgba(0,0,0,0.5)';
        menu.style.width = '250px';
        hamburgerIcon.style.display = 'none';
        closeIcon.style.display = 'inline-block';
        // Mostrar os itens do menu quando o menu estiver aberto
        
        menuItems.forEach(function(item) {
            item.style.display = 'block';
        });
    } else {
        menu.style.width = '0';
        menu.style.boxShadow = 'initial';
        hamburgerIcon.style.display = 'inline-block';
        closeIcon.style.display = 'none';
        // Ocultar os itens do menu quando o menu estiver fechado
        menuItems.forEach(function(item) {
            item.style.display = 'none';
        });
    }
}