
// Namespace object and API URL
const pokeApp = {}; 
pokeApp.randomUrl = "https://pokeapi.co/api/v2/pokemon/";
pokeApp.speciesUrl = "https://pokeapi.co/api/v2/pokemon-species/";

// Pokemon type colors
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


// =====================
// RANDOM POKEMON EVENT
// =====================

// Generate a random Pokemon when the Pokeball is clicked
pokeApp.getRandomPokemon = () => { 

    // Create an event listener where a random number is generated when the button is clicked
    document.querySelector("#clickPokeball").addEventListener("click", () => {
    pokeApp.pokeNumber = Math.floor((Math.random() * 905) + 1);

    // Combine the existing URL with the randomly generated number
    const newSpeciesUrl = pokeApp.speciesUrl + pokeApp.pokeNumber;
    const newRandomUrl = pokeApp.randomUrl + pokeApp.pokeNumber;

     // Fetch the URL specific to the Pokemon whose index number corresponds with the randomly generated number
    pokeApp.displayPokemon = () => {
        fetch(newRandomUrl)
        .then(res => {
            return res.json();
        })
        .then(data => {
            // Remove pikachu display and show the random pokemon that was generated
            document.querySelector(".landingPage").style.display = "none";
            document.querySelector(".pokemonInfo").style.display = "block";
            document.querySelector(".pokemonStats").style.visibility = "visible";


        // Create elements, apply inner content from API data, and append to page - Pokemon name, index #, and types 

        // Name
        const pokeName = document.createElement("h2");
        pokeName.classList.add("pokemonName");
        pokeName.innerText = data.name;

        // ID #
        const pokeIndex = document.createElement("p");
        pokeIndex.classList.add("pokemonIndex");
        pokeIndex.innerText = `#${data.id}`;
        
        // Append name & ID to container 
        const nameAndIndex = document.createElement("div");
        nameAndIndex.classList.add("nameAndIndex");
        nameAndIndex.append(pokeName, pokeIndex)

        // Types 
        // The type from the first array will be appended within the span with the .primaryType class
        // If the Pokemon has a secondary typing, the type from the second array will be appended within the span with the .secondaryType class
        const pokeTypes = document.createElement("p");
        pokeTypes.classList.add(".pokemonTypes");
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


        // Create pokemon image element, apply content from API, and append to page
        const pokeSprite = document.createElement("img");
        pokeSprite.classList.add(".pokemonSprite");
        pokeSprite.src = data.sprites.other['official-artwork'].front_default;
        pokeSprite.alt = data.name;  

        const spriteContainer = document.createElement("div");
        spriteContainer.classList.add("pokemonSpriteContainer");
        spriteContainer.appendChild(pokeSprite);

        // Append the Pokemon stats
        const pokeHp = document.querySelector(".hp");
        pokeHp.innerText = data.stats[0].base_stat;
        
        const pokeAttack = document.querySelector(".attack");
        pokeAttack.innerText = data.stats[1].base_stat;
        
        const pokeDefense = document.querySelector(".defense");
        pokeDefense.innerText = data.stats[2].base_stat;
        
        const pokeSpeed = document.querySelector(".speed");
        pokeSpeed.innerText = data.stats[5].base_stat;

        // Append name, index, types, and sprite
        const pokeInfo = document.querySelector(".pokemonInfo");
        pokeInfo.innerHTML = ``;
        pokeInfo.append(nameAndIndex, pokeTypes, spriteContainer)

        // Applying colors to span element corresponding to Pokemon type
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
        }) // End fetch request random pokemon
    } // End displayPokemon function 
    pokeApp.displayPokemon();
    

      // Begining of a new function to display the Fun Fact information from the second API, using the pokemon index number that corresponds with the randomly generated number
    pokeApp.displayFunFact = () => {
        // Fetch the second API call to access fun fact data
        fetch(newSpeciesUrl)
        .then(res => {
            return res.json();
        })
        .then(data => {
            pokeApp.displayQuote = document.querySelector('.quote');

            // Filter through the array of data. There are many quotes in many languages. Applied filter to only recieve back the data available in english
            pokeApp.writeQuotes = data.flavor_text_entries.filter( (english) => {

            if(english.language.name == "en") {
                pokeApp.displayQuote.textContent = english.flavor_text;
            }      
            });
        }); // END second API fetch request
    }; // END displayFunFact function 
    pokeApp.displayFunFact();

  }) // END click event listener that generates the random pokemon
} // END the entire getRandomPokemon function 








// =========================
// SEARCH FOR POKEMON EVENT
// =========================

  // Generate a Pokemon based on the user's search input
const pokeUrl = "https://pokeapi.co/api/v2/pokemon/";
const pokeSpecies = "https://pokeapi.co/api/v2/pokemon-species/";

pokeApp.searchForPokemon = () => {

// Create an event listener that fetches the URL corresponding to the user's search input on submission
document.querySelector('[name="pokemonSearchForm"]').addEventListener("submit", (event) => {
    event.preventDefault();
    
    pokeApp.userIdInput = document.querySelector("input[name=pokemonNameOrId");

    // If the user enters something into the search bar and submits the form, run the code below
    if(pokeApp.userIdInput.value) {
        // Save the users input to a variable and attach that variable to the API endpoints to access their pokemon choice
        const userChoice = pokeApp.userIdInput.value.toLowerCase();          
        const idInputUrl = pokeUrl + userChoice;
        const factsUrl = pokeSpecies + userChoice;

        // Fetch the URL specific to the Pokemon whose name or index number corresponds with value in the search bar
        fetch(idInputUrl)
            .then(res => {
                if(res.ok) {
                    return res.json();
                } else {
                    throw new Error("Please enter a valid Pokemon name or ID");
                }
            })
            .then(data => {
                // Remove pikachu display and show the user's pokemon that was generated
                document.querySelector(".landingPage").style.display = "none";
                document.querySelector(".pokemonInfo").style.display = "block";
                document.querySelector(".pokemonStats").style.visibility = "visible";
    

                // Create elements, apply inner content from API data, and append to page - Pokemon name, index #, and types 

                // Name
                const pokeName = document.createElement("h2");
                pokeName.classList.add("pokemonName");
                pokeName.innerText = data.name;

                // ID #
                const pokeIndex = document.createElement("p");
                pokeIndex.classList.add("pokemonIndex");
                pokeIndex.innerText = `#${data.id}`;

                // Append name & ID to container 
                const nameAndIndex = document.createElement("div");
                nameAndIndex.classList.add("nameAndIndex");
                nameAndIndex.append(pokeName, pokeIndex)

                // Types 
                // The type from the first array will be appended within the span with the .primaryType class
                // If the Pokemon has a secondary typing, the type from the second array will be appended within the span with the .secondaryType class
                const pokeTypes = document.createElement("p");
                pokeTypes.classList.add(".pokemonTypes");
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


                 // Create pokemon image element, apply content from API, and append to page
                const pokeSprite = document.createElement("img");
                pokeSprite.classList.add(".pokemonSprite");
                pokeSprite.src = data.sprites.other['official-artwork'].front_default;
                pokeSprite.alt = data.name;  

                const spriteContainer = document.createElement("div");
                spriteContainer.classList.add("pokemonSpriteContainer");
                spriteContainer.appendChild(pokeSprite);

                // Append the Pokemon stats
                const pokeHp = document.querySelector(".hp");
                pokeHp.innerText = data.stats[0].base_stat;
                
                const pokeAttack = document.querySelector(".attack");
                pokeAttack.innerText = data.stats[1].base_stat;
                
                const pokeDefense = document.querySelector(".defense");
                pokeDefense.innerText = data.stats[2].base_stat;
                
                const pokeSpeed = document.querySelector(".speed");
                pokeSpeed.innerText = data.stats[5].base_stat;


                // Append name, index, types, and sprite
                const pokeInfo = document.querySelector(".pokemonInfo");
                pokeInfo.innerHTML = ``;
                pokeInfo.append(nameAndIndex, pokeTypes, spriteContainer)

                 // Applying colors to span element corresponding to Pokemon type
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
            })
            .catch((err) => {
                // If the user submits the form with an invalid Pokemon name or index number, display the alert below
                alert(err);
            }) // END fetch request to first API call that generated the Pokemon and information



            // Begining of a new function to display the Fun Fact information from the second API call, using the pokemon index number that corresponds with the user input

            // Fetch the second API call to access fun fact data
            fetch(factsUrl)
            .then(res => {
                if(res.ok) {
                    return res.json();
                }
            })
            .then(data => {
                pokeApp.displayQuote = document.querySelector('.quote');

                // Filter through the array of data. There are many quotes in many languages. Applied filter to only recieve back the data available in english
                pokeApp.writeQuotes = data.flavor_text_entries.filter( (english) => {

                    if(english.language.name == "en") {
                        pokeApp.displayQuote.textContent = english.flavor_text;
                    }      
                });
            }); // END second API fetch request

        } else {
            // If the user submits the form without entering anything into the search bar, display the alert below
            alert("Please enter a Pokemon name or ID");
        } // END 
        // Clear the search bar
        pokeApp.userIdInput.value = "";
    }) // END click event listener that generates a Pokemon if valid user input 
} // END entire searchForPokemon function







pokeApp.init = () => {
pokeApp.getRandomPokemon();
pokeApp.searchForPokemon();
}


pokeApp.init(); 