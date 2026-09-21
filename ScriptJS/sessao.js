/* =========================================
   FREESIA
   SISTEMA DE SESSÃO DO USUÁRIO
========================================= */


/* =========================================
   INICIAR SESSÃO
========================================= */

function iniciarSessao(usuario) {

    if (!usuario) {
        console.error("Dados do usuário não encontrados.");
        return false;
    }

    sessionStorage.setItem("usuarioLogado", "true");

    sessionStorage.setItem(
        "idUsuario",
        usuario.id || ""
    );

    sessionStorage.setItem(
        "loginUsuario",
        usuario.login || ""
    );

    sessionStorage.setItem(
        "nomeUsuario",
        usuario.nome || ""
    );

    sessionStorage.setItem(
        "nascimentoUsuario",
        usuario.nascimento || ""
    );

    sessionStorage.setItem(
        "idadeUsuario",
        usuario.idade || ""
    );

    sessionStorage.setItem(
        "emailUsuario",
        usuario.email || ""
    );

    sessionStorage.setItem(
        "celularUsuario",
        usuario.celular || ""
    );

    sessionStorage.setItem(
        "tipoUsuario",
        usuario.tipo || ""
    );

    sessionStorage.setItem(
        "statusUsuario",
        usuario.status || ""
    );

    console.log("Usuário conectado:", usuario.nome);

    return true;
}

/* =========================================
   VERIFICAR SE EXISTE LOGIN
========================================= */

function usuarioEstaLogado() {

    return sessionStorage.getItem("usuarioLogado") === "true";

}


/* =========================================
   PEGAR DADOS DO USUÁRIO
========================================= */

function obterUsuario() {

    if (!usuarioEstaLogado()) {
        return null;
    }

    return {

        id: sessionStorage.getItem("idUsuario"),

        login: sessionStorage.getItem("loginUsuario"),

        nome: sessionStorage.getItem("nomeUsuario"),

        nascimento: sessionStorage.getItem("nascimentoUsuario"),

        idade: sessionStorage.getItem("idadeUsuario"),

        email: sessionStorage.getItem("emailUsuario"),

        celular: sessionStorage.getItem("celularUsuario"),

        tipo: sessionStorage.getItem("tipoUsuario"),

        status: sessionStorage.getItem("statusUsuario")

    };
}

/* =========================================
   PROTEGER UMA PÁGINA
========================================= */

function protegerPagina() {

    if (!usuarioEstaLogado()) {

        window.location.href = "login.html";

    }

}


/* =========================================
   MOSTRAR NOME DO USUÁRIO
========================================= */

function mostrarNomeUsuario(elemento) {

    const usuario = obterUsuario();

    if (!usuario) {
        return;
    }

    const elementoHTML =
        document.querySelector(elemento);

    if (elementoHTML) {

        elementoHTML.textContent =
            usuario.nome;

    }

}


/* =========================================
   SAIR DA CONTA
========================================= */

function sairDaConta() {

    sessionStorage.removeItem("usuarioLogado");

    sessionStorage.removeItem("idUsuario");
    sessionStorage.removeItem("loginUsuario");
    sessionStorage.removeItem("nomeUsuario");
    sessionStorage.removeItem("nascimentoUsuario");
    sessionStorage.removeItem("idadeUsuario");
    sessionStorage.removeItem("emailUsuario");
    sessionStorage.removeItem("celularUsuario");
    sessionStorage.removeItem("tipoUsuario");
    sessionStorage.removeItem("statusUsuario");

    window.location.href = "login.html";
}
