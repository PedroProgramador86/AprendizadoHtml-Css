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

  // URL da API
  const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;
 
  //  Conexão com a API
  //  fetch() envia uma requisição HTTP.

  fetch(url)
    .then(response => {
      if (!response.ok) {
        // Caso o nome esteja errado ou não exista
        throw new Error('Pokémon não encontrado!');
      }
      return response.json(); // converte o resultado em JSON
    })
    .then(data => {

        // Manipulação de dados e DOM
        // Aqui pegamos os dados do Pokémon e atualizamos o HTML dinamicamente.
  
  
      resultado.innerHTML = `
        <h2>${data.name.toUpperCase()}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p><strong>Tipo:</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
        <p><strong>Altura:</strong> ${data.height / 10} m</p>
      `;
    })
    .catch(error => {
      
        // Tratamento de Erros
        // Captura problemas como nome inválido ou falha de conexão.
        
      resultado.innerHTML = `<p>${error.message}</p>`;
    });
}
