let allPokemon = ["Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod", "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok", "Pikachu", "Raichu", "Sandshrew", "Sandslash", "nidoran-f", "Nidorina", "Nidoqueen", "nidoran-m", "Nidorino", "Nidoking", "Clefairy", "Clefable", "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect", "Venonat", "Venomoth", "Diglett", "Dugtrio", "Meowth", "Persian", "Psyduck", "Golduck", "Mankey", "Primeape", "Growlithe", "Arcanine", "Poliwag", "Poliwhirl", "Poliwrath", "Abra", "Kadabra", "Alakazam", "Machop", "Machoke", "Machamp", "Bellsprout", "Weepinbell", "Victreebel", "Tentacool", "Tentacruel", "Geodude", "Graveler", "Golem", "Ponyta", "Rapidash", "Slowpoke", "Slowbro", "Magnemite", "Magneton", "Farfetchd", "Doduo", "Dodrio", "Seel", "Dewgong", "Grimer", "Muk", "Shellder", "Cloyster", "Gastly", "Haunter", "Gengar", "Onix", "Drowzee", "Hypno", "Krabby", "Kingler", "Voltorb", "Electrode", "Exeggcute", "Exeggutor", "Cubone", "Marowak", "Hitmonlee", "Hitmonchan", "Lickitung", "Koffing", "Weezing", "Rhyhorn", "Rhydon", "Chansey", "Tangela", "Kangaskhan", "Horsea", "Seadra", "Goldeen", "Seaking", "Staryu", "Starmie", "mr-mime", "Scyther", "Jynx", "Electabuzz", "Magmar", "Pinsir", "Tauros", "Magikarp", "Gyarados", "Lapras", "Ditto", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Porygon", "Omanyte", "Omastar", "Kabuto", "Kabutops", "Aerodactyl", "Snorlax", "Articuno", "Zapdos", "Moltres", "Dratini", "Dragonair", "Dragonite", "Mewtwo"];


let currentPokemon;             // globaly declader to be used later in all functions when filled


async function displayOverview() {
    for (let i = 0; i < allPokemon.length; i++) {                       // load all pokemon from array
        const thisPokemon = allPokemon[i];
        let url = 'https://pokeapi.co/api/v2/pokemon/' + thisPokemon.toLowerCase(); //lowercase so it fits the URL
        let response = await fetch(url);                    //waiting so the function doesnt continue without this input
        currentPokemon = await response.json();             // to json so we have a file type we can work with

        let pokemonEntryBuild = '';                              // predefined and empty so it can be filled later (3 parts)
        let Types = currentPokemon["types"].length;         // checking if one or two types are defined
        pokemonEntryBuild += `
            <div id="wrapper" onclick="loadPokemon('${currentPokemon['name']}')" class="card-wrapper bg-${currentPokemon["types"]["0"]["type"]["name"]}">
                <img src="${currentPokemon["sprites"]["other"]["dream_world"]["front_default"]}" class="card-image " alt="${currentPokemon['name']}">
                <div class="card-description">
                    <h2 class="card-title">${currentPokemon['name'].substring(0,1).toUpperCase() + currentPokemon['name'].substring(1)} </h2> 
                    <p class="card-text"> ${currentPokemon["types"]["0"]["type"]["name"]}</p>`

                    if (Types > 1) {                                    // to display only if both types are set
                        pokemonEntryBuild += `<p class="card-text">${currentPokemon["types"]["1"]["type"]["name"]}</p>`
                    }
                    pokemonEntryBuild += `
                    <div class="flex-end"><span class=" id-card"># ${currentPokemon["id"]}</span></div>
                </div>
            </div>`
            document.getElementById('overview').innerHTML += pokemonEntryBuild; // let the different elements be in place befor you display it
            
        }
        hideLoader(); // remove loader when all 150 pokemon are displayed
    }


function renderPokemonInfo() {  
    let Types = currentPokemon["types"].length;                                                     // shows a variaty of info on selected pokemnon 
    console.log(currentPokemon);
    
    document.getElementById('pokemon-name').innerHTML = currentPokemon['name'].toUpperCase();
    document.getElementById('img-pokedex').src = currentPokemon["sprites"]["front_default"];   //its the .img so src =
    document.getElementById('skill-hp').innerHTML = currentPokemon["stats"][0]["base_stat"] ;
    document.getElementById('skill-attack').innerHTML = currentPokemon["stats"][1]["base_stat"] ;
    document.getElementById('skill-defence').innerHTML = currentPokemon["stats"][2]["base_stat"] ;
    document.getElementById('skill-speed').innerHTML = currentPokemon["stats"][5]["base_stat"];
    document.getElementById('type-1').innerHTML = currentPokemon["types"]["0"]["type"]["name"];
    document.getElementById('id').innerHTML = '#' + currentPokemon["id"];
    document.getElementById('height').innerHTML = 'Height:' + '&nbsp &nbsp &nbsp &nbsp &nbsp' + currentPokemon["height"]*10  +  `cm`;
    document.getElementById('weight').innerHTML = 'Weight:' + '&nbsp &nbsp &nbsp &nbsp &nbsp' + currentPokemon["weight"]/10  +  `kg`;
    document.getElementById('pokemon-name-container').classList.add('bg-${currentPokemon["types"]["0"]["type"]["name"]');
      
}



async function loadPokemon(name) {

    showCard();
    console.log('The picked Pokemon is', name);
    let url = 'https://pokeapi.co/api/v2/pokemon/' + name;        // to lowercase to make all characters small
    let response = await fetch(url);                                                    // wait for the fetch
    currentPokemon = await response.json();                                             //declare api/json to be used later

    
    renderPokemonInfo();                                                         // display pokedex on clicked pokemon for more details
}


function showCard() {
    document.getElementById('pokedex').classList.remove('d-none');
 
}


function hideCard() {
    document.getElementById('pokedex').classList.add('d-none');
 
}


function hideLoader() {
    document.getElementById('loader-container').remove();}

    /*
    window.addEventListener("load", displayOverview(){
        document.getElementById('loader-container').remove();}
        */