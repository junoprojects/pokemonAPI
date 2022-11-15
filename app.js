// Namespace object and API URL
const pokeApp = {}
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";

pokeApp.pokeTypeColor = {
    normal: "rgba(146, 157, 163, 0.6)",
    fire: "rgba(255, 157, 85, 0.7)",
    water: "rgba(102, 145, 234, 0.6)",
    electric: "rgba(244, 210, 60, 0.7)",
    grass: "rgba(99, 188, 90, 0.6)",
    ice: "rgba(115, 206, 192, 0.6)",
    fighting: "rgba(206, 65, 107, 0.6)",
    poison: "rgba(170, 107, 200, 0.7)",
    ground: "rgba(217, 120, 69, 0.6)",
    flying: "rgba(143, 169, 222, 0.7)",
    psychic: "rgba(250, 113, 121, 0.6)",
    bug: "rgba(145, 193, 47, 0.7)",
    rock: "rgba(197, 183, 140, 0.7)",
    ghost: "rgba(82, 105, 173, 0.6)",
    dragon: "rgba(111, 53, 252, 0.5)",
    dark: "rgba(90, 84, 101, 0.5)",
    steel: "rgba(90, 142, 162, 0.5)",
    fairy: "rgba(236, 143, 230, 0.7)"
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

        // Remove pikachu display
        document.querySelector(".landingPage").style.display = "none";

        // Add a border to new pokemon display
        document.querySelector(".pokemonInfo").style.border = "2px solid #58585A";
        document.querySelector(".nameAndIndex").style.border = "1.5px solid #58585A";

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
                pokeInfo.style.background = `linear-gradient(to right, #FBFBFB, ${pokeApp.primBackground})`;

            } else if (type == secondType.textContent) {
                secondType.style.background = pokeApp.pokeTypeColor[type];
                pokeApp.secondBackground = secondType.style.background;
            }

            if (data.types.length > 1) {
                pokeInfo.style.background = `linear-gradient(to right, ${pokeApp.primBackground}, white, ${pokeApp.secondBackground})`;
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

