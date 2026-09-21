document
  .getElementById("formCadastro")
  .addEventListener("submit", cadastrar);


async function cadastrar(event) {

  event.preventDefault();


  // ==========================================
  // PEGAR DADOS DO FORMULÁRIO
  // ==========================================

  const dados = {

    // IMPORTANTE:
    // informa ao Apps Script qual operação realizar
    action: "cadastro",

    nomePopular:
      document.getElementById("nomePopular").value.trim(),

    nomeCientifico:
      document.getElementById("nomeCientifico").value.trim(),

    familia:
      document.getElementById("familia").value.trim(),

    genero:
      document.getElementById("genero").value.trim(),

    especie:
      document.getElementById("especie").value.trim(),

    local:
      document.getElementById("local").value.trim(),

    data:
      document.getElementById("data").value,

    coletor:
      document.getElementById("coletor").value.trim(),

    imagem:
      document.getElementById("imagem").value.trim()
  };


  // ==========================================
  // ENVIAR PARA O GOOGLE APPS SCRIPT
  // ==========================================

  try {

    const params = new URLSearchParams();


    for (const chave in dados) {

      params.append(
        chave,
        dados[chave]
      );

    }


    // ========================================
    // URL DO APPS SCRIPT
    // ========================================

    const urlAppsScript =
      "https://script.google.com/macros/s/AKfycbytxMrzTl5QdungjAlfKt6FQ5lAmcaGlmAzzRiiAU5j25srhW-0QwZXIOgdKvcmJVi7/exec";


    // ========================================
    // DEBUG
    // ========================================

    console.log(
      "DADOS ENVIADOS PARA O APPS SCRIPT:",
      Object.fromEntries(params)
    );


    // ========================================
    // FETCH
    // ========================================

    const resposta = await fetch(
      urlAppsScript,
      {
        method: "POST",
        body: params
      }
    );


    // ========================================
    // LER RESPOSTA
    // ========================================

    const texto =
      await resposta.text();


    console.log(
      "RAW RESPONSE:",
      texto
    );


    // ========================================
    // CONVERTER PARA JSON
    // ========================================

    let resultado;

    try {

      resultado =
        JSON.parse(texto);

    } catch (e) {

      throw new Error(
        "A resposta não é um JSON válido: " +
        texto
      );

    }


    console.log(
      "RESULTADO DO CADASTRO:",
      resultado
    );


    // ========================================
    // MOSTRAR MENSAGEM
    // ========================================

    document.getElementById("msg").innerText =
      resultado.mensagem || "Resposta recebida.";


    // ========================================
    // CADASTRO REALIZADO
    // ========================================

    if (resultado.sucesso === true) {

      document
        .getElementById("formCadastro")
        .reset();

    }

  } catch (erro) {

    console.error(
      "Erro no processo de cadastro:",
      erro
    );

    document.getElementById("msg").innerText =
      "Erro ao cadastrar. Verifique a conexão ou os dados da API.";

  }

}
