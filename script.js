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


    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
      <div class="card h-200 text-center shadow">

        <div class="card-body">
          <h5 class="card-title text-capitalize">${pokemon.name}</h5>
          <button class="btn btn-primary" onclick="fetchPokemonDetails('${pokemon.url}')">Ver detalles</button>
        </div>
      </div>
    `;
    pokemonListDiv.appendChild(col);
  });
}

fetchAllPokemon();