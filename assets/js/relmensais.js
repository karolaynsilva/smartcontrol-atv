document.addEventListener('DOMContentLoaded', function () {
    const btnModoEscuro = document.getElementById('btn-modo-escuro');
    const body = document.body;
    if (localStorage.getItem('tema') === 'escuro') {
        body.classList.add('dark-theme');
        btnModoEscuro.textContent = 'Modo Claro';
    }

    btnModoEscuro.addEventListener('click', function () {
        body.classList.toggle('dark-theme');

        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('tema', 'escuro');
            btnModoEscuro.textContent = 'Modo Claro';
        } else {
            localStorage.setItem('tema', 'claro');
            btnModoEscuro.textContent = 'Modo Escuro';
        }
    });
});