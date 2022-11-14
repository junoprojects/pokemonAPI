// Namespace object and API URL
const pokeApp = {}
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";

// Random number generator
pokeApp.getRandomNumber = () => {

    // Create event listener where a random number is generated when the button is clicked
    document.querySelector("#clickPokeball").addEventListener("click", function() {
        pokeApp.pokeNumber = Math.floor((Math.random() * 905) + 1);
        // pokeApp.pokeNumber = 35;

        // Combine the existing URL with the randomly generated number
        const newPokeUrl = pokeUrl + pokeApp.pokeNumber;

    // Fetch the URL specific to the Pokemon whose index number corresponds with the randomly generated number
    fetch(newPokeUrl)
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data)

       

        const pokeName = document.createElement("h2");
        pokeName.innerText = data.name;

        const pokeId = document.createElement("p");
        pokeId.innerText = data.id;

        const pokeType = document.createElement("p");

        // Display one or multiple pokemon types 
        if (data.types.length >= 2) {
            pokeType.innerText = `${data.types[0].type.name}, ${data.types[1].type.name}`
        } else if (data.types.length <= 1) {
            pokeType.innerText = data.types[0].type.name;
        }

        // Clear any existing Pokemon sprite from the ul
        document.querySelector("ul").innerHTML = "";

        // Create image element containing Pokemon sprite
        const pokeSprite = document.createElement("img");
        pokeSprite.src = data.sprites.other['official-artwork'].front_default;
        pokeSprite.alt = data.name;

        // Append image element inside of list element
        const pokeList = document.createElement("li");
        pokeList.appendChild(pokeSprite);

        // Append list element inside of unordered list
        document.querySelector("ul").append(pokeName, pokeId, pokeType, pokeSprite);
    })

    })
}

pokeApp.getRandomNumber();
