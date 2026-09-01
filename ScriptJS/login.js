const form = document.querySelector(".login-form");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // impede envio automático

    const usuarioDigitado = document.getElementById("usuario").value;
    const senhaDigitada = document.getElementById("senha").value;

    const usuarioSalvo = localStorage.getItem("usuario");
    const senhaSalva = localStorage.getItem("senha");

    if (usuarioDigitado === usuarioSalvo && senhaDigitada === senhaSalva) {
        alert("Login realizado com sucesso!");
        window.location.href = "perfil.html"; // redireciona para o perfil
    } else {
        alert("Usuário ou senha incorretos!");
    }
});
