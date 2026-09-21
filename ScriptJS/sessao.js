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

    // Informa que existe um usuário logado
    sessionStorage.setItem("usuarioLogado", "true");

    // Salva os dados do usuário
    sessionStorage.setItem(
        "nomeUsuario",
        usuario.nome || ""
    );

    sessionStorage.setItem(
        "usuario",
        usuario.usuario || ""
    );

    sessionStorage.setItem(
        "emailUsuario",
        usuario.email || ""
    );

    sessionStorage.setItem(
        "tipoUsuario",
        usuario.tipo || "usuario"
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

        nome: sessionStorage.getItem("nomeUsuario"),

        usuario: sessionStorage.getItem("usuario"),

        email: sessionStorage.getItem("emailUsuario"),

        tipo: sessionStorage.getItem("tipoUsuario")

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

    // Apaga todas as informações da sessão
    sessionStorage.removeItem("usuarioLogado");
    sessionStorage.removeItem("nomeUsuario");
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("emailUsuario");
    sessionStorage.removeItem("tipoUsuario");

    // Volta para o login
    window.location.href = "login.html";

}
