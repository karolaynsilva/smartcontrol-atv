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

addEventListener("DOMContentLoaded", () => {
    const campoBusca = document.getElementById("campoBusca");
    if (campoBusca) {
        campoBusca.placeholder = "Pesquisar alertas, dispositivos...";

        const elementosFiltraveis = document.querySelectorAll("main .card, main > img");

        campoBusca.addEventListener("input", (e) => {
            const termo = e.target.value.toLowerCase().trim();

            elementosFiltraveis.forEach(el => {
                const conteudoTexto = el.textContent ? el.textContent.toLowerCase() : "";
                const atributoAlt = el.getAttribute("alt") ? el.getAttribute("alt").toLowerCase() : "";
                const atributoSrc = el.getAttribute("src") ? el.getAttribute("src").toLowerCase() : "";

                if (conteudoTexto.includes(termo) || atributoAlt.includes(termo) || atributoSrc.includes(termo)) {
                    el.style.display = ""; 
                } else {
                    el.style.display = "none";
                }
            });
        });
    }

    const headerForm = document.querySelector("header form");
    if (headerForm) {
        const btnTheme = document.createElement("button");
        btnTheme.type = "button";
        btnTheme.id = "btn-theme";
        btnTheme.textContent = "Modo Escuro";

        headerForm.insertBefore(btnTheme, headerForm.firstChild);

        btnTheme.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            btnTheme.textContent = document.body.classList.contains("dark-theme") ? "Modo Claro" : "Modo Escuro";
        });
    }

    const navbar = document.querySelector(".navbar");
    if (navbar) {
        navbar.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                navbar.classList.toggle("active");
            }
        });
    }
});