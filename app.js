// Namespace object and API URL
const pokeApp = {}
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";

pokeApp.pokeTypeColor = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD"
}

pokeApp.getRandomPokemon = () => {

    // Create an event listener where a random number is generated when the button is clicked
    document.querySelector("#clickPokeball").addEventListener("click", () => {
        pokeApp.pokeNumber = Math.floor((Math.random() * 905) + 1);
        // pokeApp.pokeNumber = 140;

        // Combine the existing URL with the randomly generated number
        const newPokeUrl = pokeUrl + pokeApp.pokeNumber;



    // Fetch the URL specific to the Pokemon whose index number corresponds with the randomly generated number
    fetch(newPokeUrl)
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data)

        document.querySelector(".landingPage").style.display = "none";

        // Append the Pokemon name in the h2 element with the .pokemonName class
        const pokeName = document.querySelector(".pokemonName");
        pokeName.innerText = data.name;

        // Append the Pokemon index number in the paragraph element with the .pokemonIndex class
        const pokeIndex = document.querySelector(".pokemonIndex");
        pokeIndex.innerText = `#${data.id}`;

        // Append the Pokemon type(s) in the paragraph element with the .pokemonTypes class
        // The type from the first array will be appended within the span with the .primaryType class
        // If the Pokemon has a secondary typing, the type from the second array will be appended within the span with the .secondaryType class
        const pokeTypes = document.querySelector(".pokemonTypes");
        const primType = document.createElement("span");
        const secondType = document.createElement("span");

        pokeApp.getPokeTypes = () => {
            primType.classList.add("primaryType");
            pokeTypes.innerText = "";
            primType.innerText = data.types[0].type.name;
            pokeTypes.appendChild(primType);

            if (data.types.length > 1) {
                secondType.classList.add("secondaryType");
                secondType.innerText = data.types[1].type.name;
                pokeTypes.appendChild(secondType);
            } 
        }

        pokeApp.getPokeTypes();


        // Applying colors to span element corresponding to Pokemon type
        const pokeInfo = document.querySelector(".pokemonInfo");

        for (const type in pokeApp.pokeTypeColor) {
            if (type == primType.textContent) {
                primType.style.background = pokeApp.pokeTypeColor[type];
                pokeApp.primBackground = primType.style.background;
                pokeInfo.style.background = `linear-gradient(to right, ${pokeApp.primBackground}, white)`;

            } else if (type == secondType.textContent) {
                secondType.style.background = pokeApp.pokeTypeColor[type];
                pokeApp.secondBackground = secondType.style.background;
            }

            if (data.types.length > 1) {
                pokeInfo.style.background = `linear-gradient(to right, ${pokeApp.primBackground}, ${pokeApp.secondBackground})`;
            }
        }
        

        // Append the Pokemon sprite in the img element
        const pokeSprite = document.querySelector(".pokemonSprite")
        pokeSprite.src = data.sprites.other['official-artwork'].front_default;
        pokeSprite.alt = data.name;

    })
    
    })
}

pokeApp.getRandomPokemon();

