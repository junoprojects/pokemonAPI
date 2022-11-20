

const pokeApp = {}; 
pokeApp.randomUrl = "https://pokeapi.co/api/v2/pokemon/";
pokeApp.speciesUrl = "https://pokeapi.co/api/v2/pokemon-species/";


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
    document.querySelector("#clickPokeball").addEventListener("click", () => {
    pokeApp.pokeNumber = Math.floor((Math.random() * 905) + 1);

    const newSpeciesUrl = pokeApp.speciesUrl + pokeApp.pokeNumber;
    const newRandomUrl = pokeApp.randomUrl + pokeApp.pokeNumber;


    pokeApp.displayPokemon = () => {
        fetch(newRandomUrl)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)

            document.querySelector(".landingPage").style.display = "none";
            document.querySelector(".pokemonInfo").style.display = "block";
            document.querySelector(".pokemonStats").style.visibility = "visible";


        // name and index div
        const pokeName = document.createElement("h2");
        pokeName.classList.add("pokemonName");
        pokeName.innerText = data.name;

        const pokeIndex = document.createElement("p");
        pokeIndex.classList.add("pokemonIndex");
        pokeIndex.innerText = `#${data.id}`;

        const nameAndIndex = document.createElement("div");
        nameAndIndex.classList.add("nameAndIndex");
        nameAndIndex.append(pokeName, pokeIndex)


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



        const pokeInfo = document.querySelector(".pokemonInfo");
        pokeInfo.innerHTML = ``;
        pokeInfo.append(nameAndIndex, pokeTypes, spriteContainer)
    
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


        }) // end fetch request random poke
    }

    pokeApp.displayPokemon();
    

    pokeApp.displayFunFact = () => {
        fetch(newSpeciesUrl)
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data)
            
            pokeApp.displayQuote = document.querySelector('.quote');

          // code here - filter array 
        pokeApp.writeQuotes = data.flavor_text_entries.filter( (english) => {

            if(english.language.name == "en") {
                pokeApp.displayQuote.textContent = english.flavor_text;
            }      
            });
        });
    };

    pokeApp.displayFunFact();

  }) // end eventlistener

  } // end get pokemon function 

pokeApp.init = () => {
pokeApp.getRandomPokemon();
}


pokeApp.init(); 