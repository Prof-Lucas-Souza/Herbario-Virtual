/* =========================================
   FREESIA
   CONTROLE DO MENU
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuCadastro = document.getElementById("menuCadastro");
    const menuPerfil = document.getElementById("menuPerfil");
    const menuLogin = document.getElementById("menuLogin");
    const menuSair = document.getElementById("menuSair");

    const logado = usuarioEstaLogado();


    if (logado) {

        // Usuário está logado

        if (menuCadastro) {
            menuCadastro.style.display = "inline-block";
        }

        if (menuPerfil) {
            menuPerfil.style.display = "inline-block";
        }

        if (menuLogin) {
            menuLogin.style.display = "none";
        }

        if (menuSair) {
            menuSair.style.display = "inline-block";
        }

    } else {

        // Ninguém está logado

        if (menuCadastro) {
            menuCadastro.style.display = "none";
        }

        if (menuPerfil) {
            menuPerfil.style.display = "none";
        }

        if (menuLogin) {
            menuLogin.style.display = "inline-block";
        }

        if (menuSair) {
            menuSair.style.display = "none";
        }

    }

});