/* =========================================
   FREESIA
   SISTEMA DE LOGIN
========================================= */

// URL DO WEB APP DO GOOGLE APPS SCRIPT
const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbytxMrzTl5QdungjAlfKt6FQ5lAmcaGlmAzzRiiAU5j25srhW-0QwZXIOgdKvcmJVi7/exec";


const form = document.querySelector(".login-form");


form.addEventListener("submit", async function (event) {

    event.preventDefault();


    // =========================================
    // PEGAR DADOS DO FORMULÁRIO
    // =========================================

    const usuarioDigitado =
        document.getElementById("usuario").value.trim();

    const senhaDigitada =
        document.getElementById("senha").value.trim();


    // =========================================
    // VERIFICAR CAMPOS
    // =========================================

    if (!usuarioDigitado || !senhaDigitada) {

        alert("Preencha o usuário e a senha.");

        return;
    }


    try {

        // =========================================
        // PREPARAR DADOS
        // =========================================

        const dados = new URLSearchParams();

        dados.append("action", "login");
        dados.append("usuario", usuarioDigitado);
        dados.append("senha", senhaDigitada);

         console.log("URL DO APPS SCRIPT:", URL_SCRIPT);
         console.log("DADOS ENVIADOS:", {
             action: "login",
             usuario: usuarioDigitado,
             senha: senhaDigitada
         });


        // =========================================
        // ENVIAR PARA O GOOGLE APPS SCRIPT
        // =========================================

        const resposta = await fetch(URL_SCRIPT, {

            method: "POST",

            body: dados

        });


        // =========================================
        // VERIFICAR RESPOSTA HTTP
        // =========================================

        if (!resposta.ok) {

            throw new Error(
                "Erro HTTP: " + resposta.status
            );

        }


        // =========================================
        // CONVERTER RESPOSTA PARA JSON
        // =========================================

        const resultado =
            await resposta.json();


        console.log(
            "Resposta do Apps Script:",
            resultado
        );


        // =========================================
        // LOGIN BEM-SUCEDIDO
        // =========================================

        if (resultado.sucesso === true) {

            console.log(
                "Usuário autenticado:",
                resultado.usuario
            );


            // =========================================
            // INICIAR SESSÃO
            // =========================================

            const sessaoIniciada =
                iniciarSessao(resultado.usuario);


            if (!sessaoIniciada) {

                alert(
                    "O login foi realizado, " +
                    "mas não foi possível iniciar a sessão."
                );

                return;
            }


            // =========================================
            // REDIRECIONAR
            // =========================================

            alert("Login realizado com sucesso!");

            window.location.href = "perfil.html";


        } else {

            // =========================================
            // LOGIN NEGADO
            // =========================================

            alert(
                resultado.mensagem ||
                "Usuário ou senha estão incorretos!"
            );

        }


    } catch (erro) {

        console.error(
            "Erro ao realizar login:",
            erro
        );


        alert(
            "Não foi possível realizar o login.\n\n" +
            "Verifique a conexão com o servidor."
        );

    }

});
