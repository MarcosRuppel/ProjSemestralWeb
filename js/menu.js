function toggleMenu() {
    var menu = document.querySelector('.menu');
    var hamburgerIcon = document.getElementById('hamburger-icon');
    var closeIcon = document.getElementById('close-icon');

    if (menu.style.right === '-250px' || menu.style.right === '') {
        menu.style.right = '0';
        hamburgerIcon.style.display = 'none';
        closeIcon.style.display = 'inline-block';
    } else {
        menu.style.right = '-250px';
        hamburgerIcon.style.display = 'inline-block';
        closeIcon.style.display = 'none';
    }
}
