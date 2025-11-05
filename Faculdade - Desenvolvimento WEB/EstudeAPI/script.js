/* ===========================================================
   3️⃣ Lógica com JavaScript
   ===========================================================
   Aqui é onde a "mágica" acontece: o JavaScript torna o site dinâmico.
   Dica de estudo: procure sobre "DOM", "fetch API" e "event listeners".
*/

// Seleciona elementos HTML pelo ID (forma de acessar o DOM)
const input = document.getElementById('pokemonInput');
const botao = document.getElementById('buscarBtn');
const resultado = document.getElementById('resultado');

// Escuta o clique do botão e executa a função buscarPokemon()
botao.addEventListener('click', buscarPokemon);

// Função principal - faz a busca na API e mostra os dados
function buscarPokemon() {
  const nome = input.value.toLowerCase(); // pega o nome digitado e transforma em minúsculas

  // Verifica se o campo está vazio
  if (nome === '') {
    resultado.innerHTML = '<p>Por favor, digite um nome de Pokémon.</p>';
    return;
  }

  // URL da API (endpoint)
  const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;

  /* ============================
     4️⃣ Conexão com a API
     ============================
     fetch() envia uma requisição HTTP.
     É assim que pegamos dados de uma API na web.
     Dica: estude "fetch + promises + JSON".
  */
  fetch(url)
    .then(response => {
      if (!response.ok) {
        // Caso o nome esteja errado ou não exista
        throw new Error('Pokémon não encontrado!');
      }
      return response.json(); // converte o resultado em JSON
    })
    .then(data => {
      /* ==============================
         5️⃣ Manipulação de dados e DOM
         ==============================
         Aqui pegamos os dados do Pokémon e atualizamos o HTML dinamicamente.
         Dica: pesquise sobre "template literals" e "innerHTML".
      */
      resultado.innerHTML = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p><strong>Tipo:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
        <p><strong>Altura:</strong> ${data.height / 10} m</p>
      `;
    })
    .catch(error => {
      /* ==============================
         6️⃣ Tratamento de Erros
         ==============================
         Captura problemas como nome inválido ou falha de conexão.
         Dica: estude "try...catch" e "bloco catch de promises".
      */
      resultado.innerHTML = `<p>${error.message}</p>`;
    });
}
