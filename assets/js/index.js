document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-login');
    const email = document.getElementById('email');
    const senha = document.getElementById('senha');
    const btnEntrar = document.getElementById('btn-entrar');

    const erroEmail = document.getElementById('erro-email');
    const erroSenha = document.getElementById('erro-senha');

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
        marcarValido(senha, erroSenha);
        return true;
    }

    function atualizarBotao() {
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        const senhaValida = senha.value.length >= 8;
        btnEntrar.disabled = !(emailValido && senhaValida);
    }


    email.addEventListener('input', function () {
        validarEmail();
        atualizarBotao();
    });

    senha.addEventListener('input', function () {
        validarSenha();
        atualizarBotao();
    });

   
    email.addEventListener('blur', validarEmail);
    senha.addEventListener('blur', validarSenha);

    atualizarBotao();

    form.addEventListener('submit', function (e) {
        const emailOk = validarEmail();
        const senhaOk = validarSenha();

        if (!emailOk || !senhaOk) {
            e.preventDefault();
        }
    });
});