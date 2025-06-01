const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=1300';

const pokemonListDiv = document.getElementById('pokemon-list');
const searchInput = document.getElementById('search');
const detailsDiv = document.getElementById('pokemon-details');

let allPokemon = [];

async function fetchAllPokemon() {
  const response = await fetch(API_URL);
  const data = await response.json();
  allPokemon = data.results;
  renderPokemonList(allPokemon);
}

function renderPokemonList(pokemonArray) {
  pokemonListDiv.innerHTML = '';
  pokemonArray.forEach(pokemon => {
    const id = pokemon.url.split('/')[6];
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
      <div class="card h-200 text-center shadow ">
                <p  class="texto">ID: ${id}</p>
        <img src="${imageUrl}" class="card-img-top mx-auto mt-3" style="width: 200px;" alt="${pokemon.name}">
        <div class="card-body">
          <h5 class="card-title text-capitalize">${pokemon.name}</h5>

          <button class="btn btn-primary" onclick="fetchPokemonDetails('${pokemon.url}')">Ver detalles</button>
          
        </div>
      </div>
    `;
    pokemonListDiv.appendChild(col);
  });
}

async function fetchPokemonDetails(url) {
  const response = await fetch(url);
  const data = await response.json();

  const sprite = data.sprites.front_default || '';
  const moves = data.moves.map(m => m.move.name).join(' ⁃ ');
  const stats = data.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join('');
const typesFormatted = data.types.map(t => {
  const typeName = t.type.name;
  const typeClass = `type-${typeName}`;
  const label = typeName.charAt(0).toUpperCase() + typeName.slice(1);
  return `<span class="${typeClass} me-2">${label}</span>`;
}).join('');

detailsDiv.innerHTML = `
  <div class="position-fixed top-0 end-0 vh-100 bg-light p-3" style="width: 400px; overflow-y: scroll;">
    <div class="card shadow mt-5">
      <div class="card-body">
          
      <button class="btn btn-danger mb-3" onclick="closeDetails()"> X </button>

        <h2 class="card-title text-capitalize">${data.name}</h2>
        <img src="${sprite}" alt="${data.name}" class="mb-3" style="width: 300px;">


<h4>Tipo:</h4>
<p>${typesFormatted}</p>

        <h4>Estadísticas:</h4>
        <ul class="fs-4">${stats}</ul>
        <h4>Movimientos:</h4>
        <p>${moves}</p>
      </div>
    </div>
  </div>
`;

}
// Función para filtrar la lista de Pokémon
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allPokemon.filter(p => p.name.toLowerCase().includes(searchTerm));

  
  renderPokemonList(filtered);
});
    function closeDetails() {
      detailsDiv.innerHTML = '';
    }
fetchAllPokemon();
