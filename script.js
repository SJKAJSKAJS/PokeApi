const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=1300';

let allPokemon = [];

async function fetchAllPokemon() {
  const response = await fetch(API_URL);
  const data = await response.json();
  allPokemon = data.results;

  console.log("Pokémon:");
  allPokemon.forEach(pokemon => {
    console.log(pokemon.name);
  });
}


fetchAllPokemon();