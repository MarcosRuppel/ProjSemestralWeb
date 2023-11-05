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