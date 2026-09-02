document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-cadastro');
    const nome = document.getElementById('nome');
    const data = document.getElementById('data');
    const email = document.getElementById('email_cadastro');
    const senha = document.getElementById('senha_criada');
    const nivel = document.getElementById('nivel');
    const termos = document.getElementById('termos');
    const btnCriar = document.getElementById('btn-criar');

    const erroNome = document.getElementById('erro-nome');
    const erroData = document.getElementById('erro-data');
    const erroEmail = document.getElementById('erro-email');
    const erroSenha = document.getElementById('erro-senha');
    const erroNivel = document.getElementById('erro-nivel');
    const erroTermos = document.getElementById('erro-termos');

    const IDADE_MINIMA = 13;

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

    function validarNome() {
        const valor = nome.value.trim();

        if (valor === '') {
            limparEstado(nome, erroNome);
            return false;
        }
        if (valor.length < 3) {
            marcarErro(nome, erroNome, 'Digite o nome completo.');
            return false;
        }
        if (!/^[A-Za-zÀ-ÿ\s]+$/.test(valor)) {
            marcarErro(nome, erroNome, 'O nome não pode conter números ou símbolos.');
            return false;
        }
        if (!valor.includes(' ')) {
            marcarErro(nome, erroNome, 'Digite nome e sobrenome.');
            return false;
        }
        marcarValido(nome, erroNome);
        return true;
    }

    function calcularIdade(dataNascimento) {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mesDiff = hoje.getMonth() - nascimento.getMonth();
        if (mesDiff < 0 || (mesDiff === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    }

    function validarData() {
        const valor = data.value;

        if (valor === '') {
            limparEstado(data, erroData);
            return false;
        }

        const dataEscolhida = new Date(valor);
        const hoje = new Date();

        if (dataEscolhida > hoje) {
            marcarErro(data, erroData, 'A data não pode ser no futuro.');
            return false;
        }

        const idade = calcularIdade(valor);
        if (idade < IDADE_MINIMA) {
            marcarErro(data, erroData, `É necessário ter no mínimo ${IDADE_MINIMA} anos.`);
            return false;
        }

        marcarValido(data, erroData);
        return true;
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
        return true;
    }

    function validarNivel() {
        if (nivel.value === '') {
            marcarErro(nivel, erroNivel, 'Selecione um nível de acesso.');
            return false;
        }
        marcarValido(nivel, erroNivel);
        return true;
    }

    function validarTermos() {
        if (!termos.checked) {
            erroTermos.textContent = 'Você precisa aceitar os Termos de Uso.';
            return false;
        }
        erroTermos.textContent = '';
        return true;
    }

    function validarTudo() {
        const nomeOk = validarNome();
        const dataOk = validarData();
        const emailOk = validarEmail();
        const senhaOk = validarSenha();
        const nivelOk = validarNivel();
        const termosOk = validarTermos();
        return nomeOk && dataOk && emailOk && senhaOk && nivelOk && termosOk;
    }

    function atualizarBotao() {
        const nomeValido = nome.value.trim().length >= 3 && nome.value.trim().includes(' ');
        const dataValida = data.value !== '' && calcularIdade(data.value) >= IDADE_MINIMA;
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        const senhaValida = senha.value.length >= 8 && /[A-Z]/.test(senha.value) && /[0-9]/.test(senha.value);
        const nivelValido = nivel.value !== '';
        const termosValidos = termos.checked;

        btnCriar.disabled = !(nomeValido && dataValida && emailValido && senhaValida && nivelValido && termosValidos);
    }

    // Validação em tempo real
    nome.addEventListener('input', function () { validarNome(); atualizarBotao(); });
    data.addEventListener('input', function () { validarData(); atualizarBotao(); });
    email.addEventListener('input', function () { validarEmail(); atualizarBotao(); });
    senha.addEventListener('input', function () { validarSenha(); atualizarBotao(); });
    nivel.addEventListener('change', function () { validarNivel(); atualizarBotao(); });
    termos.addEventListener('change', function () { validarTermos(); atualizarBotao(); });

    // Reforço ao sair do campo
    nome.addEventListener('blur', validarNome);
    data.addEventListener('blur', validarData);
    email.addEventListener('blur', validarEmail);
    senha.addEventListener('blur', validarSenha);

    atualizarBotao();

    form.addEventListener('submit', function (e) {
        if (!validarTudo()) {
            e.preventDefault();
        }
    });
});