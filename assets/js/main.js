function mensagemBoasVindas() {
    let nomeCompleto = prompt("Digite seu Nome Completo:");
    if (nomeCompleto  === "") {
        nomeCompleto = "Usuário";
    }

    const atual = new Date();
    const diasSemana = ["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"];
    
    const diasSemanaTexto = diasSemana[atual.getDay()];
    let dias = String(atual.getDate());
    if (atual.getDate() < 10) {
        dias = "0" + dias;
    }

    let mes = String(atual.getMonth() + 1);
    if (atual.getMonth() + 1 < 10) {
        mes = "0" + mes;
    }

    const ano = atual.getFullYear();

    let horas = String(atual.getHours());
    if (atual.getHours() < 10) {
        horas = "0" + horas;
    }

    let minutos = String(atual.getMinutes());
    if (atual.getMinutes() < 10) {
        minutos = "0" + minutos;
    }

    const fusoHorario = "-03:00";
    const dataAtual = ` ${diasSemanaTexto}, ${dias}/${mes}/${ano} - ${horas}:${minutos} (${fusoHorario}) `;
    const mensagem = ` Olá, ${nomeCompleto}! Hoje é ${dataAtual} `;

    const formularioLogout = document.querySelector("header form");
    if (formularioLogout) {
        formularioLogout.childNodes[0].textContent = mensagem + " ";
    }
    console.log(mensagem);
}

mensagemBoasVindas();

