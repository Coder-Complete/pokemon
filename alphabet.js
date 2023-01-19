fetch("https://pokeapi.co/api/v2/pokemon?limit=1279")
  .then((response) => response.json())
  .then((data) => {
    let letters = document.querySelectorAll("li");

    for (let i = 0; i < letters.length; i++) {
      let currentLetterDomNode = letters[i];
      let currentLetter = currentLetterDomNode.textContent;

      currentLetterDomNode.addEventListener("click", () => {
        // clear current pokemon
        clearAllPokemonContainer();
        // show pokemon that start with that letter
        for (let j = 0; j < data.results.length; j++) {
          let pokemon = data.results[j];
          if (pokemon.name.toUpperCase().startsWith(currentLetter)) {
            addPokemonToUI(pokemon);
          }
        }
      });
    }
  });

function clearAllPokemonContainer() {
  document.querySelector(".all-pokemon-container").innerHTML = "";
}

function addPokemonToUI(pokemon) {
  fetch(pokemon.url)
    .then((response) => response.json())
    .then((pokemonData) => {
      let pokemonDiv = document.createElement("div");
      pokemonDiv.className = "single-pokemon-container";

      let nameH1 = document.createElement("h1");
      nameH1.innerText = pokemon.name;
      pokemonDiv.append(nameH1);

      let img = document.createElement("img");
      img.src = pokemonData.sprites.front_default;
      img.alt = pokemonData.name;
      pokemonDiv.append(img);

      document.querySelector(".all-pokemon-container").append(pokemonDiv);
    });
}
