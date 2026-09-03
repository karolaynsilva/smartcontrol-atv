document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-senha');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    const confirmarSenha = document.getElementById('confirmar_senha');
    const btnCriar = document.getElementById('btn-criar');

    const erroEmail = document.getElementById('erro-email');
    const erroSenha = document.getElementById('erro-senha');
    const erroConfirmar = document.getElementById('erro-confirmar');

    function marcarErro(campo, spanErro, mensagem) {
        campo.classList.remove('valido');
        campo.classList.add('invalido');
        spanErro.textContent = mensagem;
    }

    function marcarValido(campo, spanErro) {
        campo.classList.remove('invalido');
        campo.classList.add('valido');
        spanErro.textContent = '';
    }

    function limparEstado(campo, spanErro) {
        campo.classList.remove('valido', 'invalido');
        spanErro.textContent = '';
    }

    function validarEmail() {
        const valor = email.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (valor === '') {
            limparEstado(email, erroEmail);
            return false;
        }
        if (!regex.test(valor)) {
            marcarErro(email, erroEmail, 'Digite um e-mail válido.');
            return false;
        }
        marcarValido(email, erroEmail);
        return true;
    }

    function validarSenha() {
        const valor = senha.value;

        if (valor === '') {
            limparEstado(senha, erroSenha);
            return false;
        }
        if (valor.length < 8) {
            marcarErro(senha, erroSenha, 'A senha precisa ter no mínimo 8 caracteres.');
            return false;
        }
        if (!/[A-Z]/.test(valor) || !/[0-9]/.test(valor)) {
            marcarErro(senha, erroSenha, 'Use ao menos 1 letra maiúscula e 1 número.');
            return false;
        }
        marcarValido(senha, erroSenha);


        if (confirmarSenha.value !== '') {
            validarConfirmarSenha();
        }

        return true;
    }

    function validarConfirmarSenha() {
        const valor = confirmarSenha.value;

        if (valor === '') {
            limparEstado(confirmarSenha, erroConfirmar);
            return false;
        }
        if (valor !== senha.value) {
            marcarErro(confirmarSenha, erroConfirmar, 'As senhas não coincidem.');
            return false;
        }
        marcarValido(confirmarSenha, erroConfirmar);
        return true;
    }

    function validarTudo() {
        const emailOk = validarEmail();
        const senhaOk = validarSenha();
        const confirmarOk = validarConfirmarSenha();
        return emailOk && senhaOk && confirmarOk;
    }

    function atualizarBotao() {
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        const senhaValida = senha.value.length >= 8 && /[A-Z]/.test(senha.value) && /[0-9]/.test(senha.value);
        const confirmarValida = confirmarSenha.value !== '' && confirmarSenha.value === senha.value;

        btnCriar.disabled = !(emailValido && senhaValida && confirmarValida);
    }

    email.addEventListener('input', function () { validarEmail(); atualizarBotao(); });
    senha.addEventListener('input', function () { validarSenha(); atualizarBotao(); });
    confirmarSenha.addEventListener('input', function () { validarConfirmarSenha(); atualizarBotao(); });

   
    email.addEventListener('blur', validarEmail);
    senha.addEventListener('blur', validarSenha);
    confirmarSenha.addEventListener('blur', validarConfirmarSenha);

    atualizarBotao();

    form.addEventListener('submit', function (e) {
        if (!validarTudo()) {
            e.preventDefault();
        }
    });
});
