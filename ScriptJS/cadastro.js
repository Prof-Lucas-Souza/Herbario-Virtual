document
  .getElementById("formCadastro")
  .addEventListener("submit", cadastrar);

async function cadastrar(event) {
  event.preventDefault();

  const dados = {
    nomePopular: document.getElementById("nomePopular").value,
    nomeCientifico: document.getElementById("nomeCientifico").value,
    familia: document.getElementById("familia").value,
    genero: document.getElementById("genero").value,
    especie: document.getElementById("especie").value,
    local: document.getElementById("local").value,
    data: document.getElementById("data").value,
    coletor: document.getElementById("coletor").value,
    imagem: document.getElementById("imagem").value
  };

  try {
    const params = new URLSearchParams();
    for (const chave in dados) {
      params.append(chave, dados[chave]);
    }

    // A sua URL atual que estava no log de erro
    const urlAppsScript = "https://script.google.com/macros/s/AKfycbytxMrzTl5QdungjAlfKt6FQ5lAmcaGlmAzzRiiAU5j25srhW-0QwZXIOgdKvcmJVi7/exec";

    // 🔥 FETCH SIMPLIFICADO: Sem a propriedade 'headers' para não engatilhar o CORS do Google
    const resposta = await fetch(urlAppsScript, {
      method: "POST",
      body: params
    });

    const texto = await resposta.text();
    console.log("RAW RESPONSE:", texto);

    let resultado;
    try {
      resultado = JSON.parse(texto);
    } catch (e) {
      throw new Error("A resposta não é um JSON válido: " + texto);
    }

    document.getElementById("msg").innerText = resultado.mensagem;

    if (resultado.status === "ok") {
      document.getElementById("formCadastro").reset();
    }

  } catch (erro) {
    console.error("Erro no processo de cadastro:", erro);
    document.getElementById("msg").innerText =
      "Erro ao cadastrar. Verifique a conexão ou os dados da API.";
  }
}
