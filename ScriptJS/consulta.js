// Captura o evento de envio do formulário
document
  .getElementById("formPesquisa")
  .addEventListener("submit", pesquisar);

async function pesquisar(event) {
  event.preventDefault();

  let texto = document.getElementById("busca").value;

  let url =
    "https://script.google.com/macros/s/AKfycbytxMrzTl5QdungjAlfKt6FQ5lAmcaGlmAzzRiiAU5j25srhW-0QwZXIOgdKvcmJVi7/exec?busca="
    + encodeURIComponent(texto);

  let resposta = await fetch(url);
  let dados = await resposta.json();

  let html = "";

  dados.forEach(planta => {
    html += `
      <div class="card">
        <div class="card-inner">
          <!-- Frente -->
          <div class="card-front">
            <h2>${planta.nomeCientifico}</h2>
            <img src="${planta.imagem}" alt="${planta.nomePopular}">
            
            <!-- Caixa de descrição com borda verde -->
            <div class="descricao-planta">
              <h3>${planta.familia}</h3>
              <p>
                 Conhecida como <b>${planta.nomePopular}</b>, é uma Árvore ornamental com flores em cachos vistosos.
                 Prefere climas quentes e solos bem drenados. Símbolo de <i>longevidade</i> e <i>renovação espiritual</i>,
                 muito usada em jardins tropicais.
              </p>
            </div>
          </div>

          <!-- Verso -->
          <div class="card-back">
            <h3>Informações científicas</h3>
            <p><b>Nome científico:</b> ${planta.nomeCientifico}</p>
            <p><b>Família:</b> ${planta.familia}</p>
            <p><b>Gênero:</b> ${planta.genero}</p>
            <p><b>Espécie:</b> ${planta.especie}</p>
            <p><b>Local:</b> ${planta.local}</p>
            <p><b>Coletor:</b> ${planta.coletor}</p>
          </div>
        </div>
      </div>
    `;
  });

  document.getElementById("resultado").innerHTML = html;

  // ativa o flip ao clique em cada card
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });
}


