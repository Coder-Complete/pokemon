// let allPokemonData = [];

let baseUrl = "https://pokeapi.co/api/v2/pokemon";

let pageNumber = 1;

function returnQueryParameters(num) {
  return `?offset=${(num - 1) * 20}`;
}

function getPokemon() {
  clearAllPokemonContainer();
  let url = baseUrl + returnQueryParameters(pageNumber);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.results.length; i++) {
        let pokemon = data.results[i];
        addPokemonToUI(pokemon);
      }

      let numOfPages = Math.ceil(data.count / 20);
      for (let i = 1; i <= numOfPages; i++) {
        let number = document.createElement("span");
        number.style.margin = "0px 5px";
        number.style.cursor = "pointer";
        number.style.color = "blue";
        number.innerText = i;
        number.addEventListener("click", () => {
          pageNumber = i;
          getPokemon();
        });
        document.querySelector(".page-numbers").append(number);
      }
    });
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
      pokemonDiv.append(img);

      document.querySelector(".all-pokemon-container").append(pokemonDiv);
    });
}

function clearAllPokemonContainer() {
  document.querySelector(".all-pokemon-container").innerHTML = "";
}

function getNextPage() {
  pageNumber++;
  getPokemon();
}

function getPreviousPage() {
  if (pageNumber > 1) {
    pageNumber--;
    getPokemon();
  }
}

getPokemon();

// let gotToBottom = false;

// window.onscroll = function () {
//   if (
//     gotToBottom === false &&
//     window.innerHeight + window.pageYOffset >= document.body.offsetHeight
//   ) {
//     getPokemon(nextPage);
//     gotToBottom = true;
//     setTimeout(() => {
//       gotToBottom = false;
//     }, 1000);
//   }
// };
