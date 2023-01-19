fetch("https://pokeapi.co/api/v2/pokemon")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    for (let i = 0; i < data.results.length; i++) {
      let pokemon = data.results[i];
      addPokemonToUI(pokemon);
    }
  });

function addPokemonToUI(pokemon) {
  let pokemonDiv = document.createElement("div");
  pokemonDiv.className = "pokemon-container";
  let nameH1 = document.createElement("h1");
  nameH1.innerText = pokemon.name;
  pokemonDiv.append(nameH1);
  document.body.append(pokemonDiv);
}
