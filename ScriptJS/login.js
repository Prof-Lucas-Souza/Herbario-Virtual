const form = document.querySelector(".login-form");

// URL DO SEU WEB APP DO GOOGLE APPS SCRIPT
const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbytxMrzTl5QdungjAlfKt6FQ5lAmcaGlmAzzRiiAU5j25srhW-0QwZXIOgdKvcmJVi7/exec";

form.addEventListener("submit", async (event) => {

    event.preventDefault();

    const usuarioDigitado = document.getElementById("usuario").value.trim();
    const senhaDigitada = document.getElementById("senha").value.trim();

    if (!usuarioDigitado || !senhaDigitada) {
        alert("Preencha usuário e senha.");
        return;
    }

    try {

        const dados = new URLSearchParams();

        dados.append("action", "login");
        dados.append("usuario", usuarioDigitado);
        dados.append("senha", senhaDigitada);

        const resposta = await fetch(URL_SCRIPT, {
            method: "POST",
            body: dados
        });

        if (!resposta.ok) {
            throw new Error("Erro ao conectar com o servidor.");
        }

        const resultado = await resposta.json();

        console.log("Resposta do servidor:", resultado);

        if (resultado.sucesso) {

            // Salva os dados do usuário na sessão do navegador
            sessionStorage.setItem(
                "usuario",
                JSON.stringify(resultado.usuario)
            );

            alert("Login realizado com sucesso!");

            window.location.href = "perfil.html";

        } else {

            alert(resultado.mensagem || "Usuário ou senha estão incorretos!");

        }

    } catch (erro) {

        console.error("Erro no login:", erro);

        alert(
            "Não foi possível realizar o login. " +
            "Verifique sua conexão e tente novamente."
        );

    }

});
