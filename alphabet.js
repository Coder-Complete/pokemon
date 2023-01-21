// fetch("https://pokeapi.co/api/v2/pokemon?limit=1279")
//   .then((response) => response.json())
//   .then((data) => {
//     let letters = document.querySelectorAll("li");

//     for (let i = 0; i < letters.length; i++) {
//       let currentLetterDomNode = letters[i];
//       let currentLetter = currentLetterDomNode.textContent;

//       currentLetterDomNode.addEventListener("click", () => {
//         // clear current pokemon
//         clearAllPokemonContainer();
//         // show pokemon that start with that letter
//         for (let j = 0; j < data.results.length; j++) {
//           let pokemon = data.results[j];
//           if (pokemon.name.toUpperCase().startsWith(currentLetter)) {
//             addPokemonToUI(pokemon);
//           }
//         }
//       });
//     }
//   })
//   .catch((err) => {
//     // ...do stuff with error
//   });

async function getInitialData() {
  try {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1279");
    let data = await response.json();
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
  } catch (err) {
    // do something with error - display the error message to however you want
  }
}

function clearAllPokemonContainer() {
  document.querySelector(".all-pokemon-container").innerHTML = "";
}

// function isPokemonDataWeird(pokemonData) {
//   // check a bunch of conditions to make sure the data is good
//   // return true;
//   // return pokemonData.message === "no data";
//   return true;
// }

let isErrorMessageShown = false;

async function addPokemonToUI(pokemon) {
  try {
    let response = await fetch(pokemon.url);
    let pokemonData = await response.json();

    // if (isPokemonDataWeird(pokemonData)) {
    //   throw new Error("pokemon data is weird");
    // }

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
  } catch (err) {
    if (isErrorMessageShown === false) {
      let h1 = document.createElement("h1");
      h1.innerText = err.message;
      document.querySelector(".error-container").append(h1);
      isErrorMessageShown = true;
    }
  }
}

getInitialData();
