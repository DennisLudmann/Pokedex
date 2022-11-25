let allLoadedPokemon = [];
let currentPokemon;
let loadCounter = 15;
let listOfPokemonNames = [];


async function displayOverview() {
    for (let i = 1; i < loadCounter; i++) {                       // load pokemon from api
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;  
        let response = await fetch(url);                    //waiting so the function doesnt continue without this input
        currentPokemon = await response.json();             // to json so we have a file type we can work with
        allLoadedPokemon.push(currentPokemon);
        renderPokemonOverview();                            // builds the different pokecards
    }
    // isLoaderActive();
    fillPokemonNames();                                   
}

async function fillPokemonNames(){
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=100`;
    let response = await fetch(url);                    //waiting so the function doesnt continue without this input
    listOfPokemonNames = await response.json();             // to json so we have a file type we can work with
    console.log(listOfPokemonNames['results'][0]['name']);
    // return listOfPokemonNames.results;

    // for (let i = 0; i < 100; i++) {
    //     let pokemons = url[i];
    //     let pokemon = (pokemons['name']);
    //     console.log(pokemon)
    // }
};

function isLoaderActive() {                                    // remove loader when loadCounter are displayed
    const div = document.querySelector('section');
    console.log(div);
    if (div.classList.contains('loader-container') == true) {
        hideLoader();
    }
}


function renderPokemonOverview() {
let pokemonEntryBuild = '';                                 // predefined and empty so it can be filled later
        let Types = currentPokemon["types"].length;         // checking if one or two types are defined
        if (Types < 2) {                                    // use the builder for one or two skills, depending on Types.length
            pokemonEntryBuild += cardGeneratorOne(pokemonEntryBuild)
        }
        else {
            pokemonEntryBuild += cardGeneratorTwo(pokemonEntryBuild)
        }
        document.getElementById('overview').innerHTML += pokemonEntryBuild; // let the different elements be in place before you display it
}


function renderPokemonInfo() {
    let Types = currentPokemon["types"].length;                                                         // shows a variety of info on selected pokemon 
    document.getElementById('pokemon-name').innerHTML = currentPokemon['name'].toUpperCase();
    document.getElementById('img-pokedex').src = currentPokemon["sprites"]["front_default"];            //its the .img so src =
    document.getElementById('skill-hp').innerHTML = currentPokemon["stats"][0]["base_stat"];
    document.getElementById('skill-attack').innerHTML = currentPokemon["stats"][1]["base_stat"];
    document.getElementById('skill-defence').innerHTML = currentPokemon["stats"][2]["base_stat"];
    document.getElementById('skill-speed').innerHTML = currentPokemon["stats"][5]["base_stat"];
    document.getElementById('type-1').innerHTML = currentPokemon["types"]["0"]["type"]["name"];
    document.getElementById('id').innerHTML = '#' + currentPokemon["id"];
    document.getElementById('height').innerHTML = 'Height:' + '&nbsp &nbsp &nbsp &nbsp &nbsp' + currentPokemon["height"] * 10 + `cm`;
    document.getElementById('weight').innerHTML = 'Weight:' + '&nbsp &nbsp &nbsp &nbsp &nbsp' + currentPokemon["weight"] / 10 + `kg`;
    document.getElementById('pokemon-name-container').classList.add('bg-${currentPokemon["types"]["0"]["type"]["name"]');
}


async function loadPokemon(name) {
    showCard();
    console.log('The picked Pokemon is', name);
    let url = 'https://pokeapi.co/api/v2/pokemon/' + name;                                  // to lowercase to make all characters small
    let response = await fetch(url);                                                        // wait for the fetch
    currentPokemon = await response.json();                                                 //declare api/json to be used later
    renderPokemonInfo();                                                                    // display pokedex on clicked pokemon for more details
}


function showCard() {
    document.getElementById('pokedex').classList.remove('d-none');

}


function hideCard() {
    document.getElementById('pokedex').classList.add('d-none');

}


function hideLoader() {
    document.getElementById('loader-container').remove();
}


function addMorePokemon(){
    loadCounter = loadCounter + 15;
    displayOverview();
    
}


function cardGeneratorOne(pokemonEntryBuild) {
    return `
    <div id="wrapper" onclick="loadPokemon('${currentPokemon['name']}')" class="card-wrapper bg-${currentPokemon["types"]["0"]["type"]["name"]}">
        <img src="${currentPokemon["sprites"]["other"]["dream_world"]["front_default"]}" class="card-image " alt="${currentPokemon['name']}">
        <div class="card-description">
            <h2 class="card-title">${currentPokemon['name'].substring(0, 1).toUpperCase() + currentPokemon['name'].substring(1)} </h2> 
             <p class="card-text"> ${currentPokemon["types"]["0"]["type"]["name"]}</p>
            <div class="flex-end"><span class=" id-card"># ${currentPokemon["id"]}</span></div>
        </div>
    </div>`
}

function cardGeneratorTwo(pokemonEntryBuild) {
    return `
    <div id="wrapper" onclick="loadPokemon('${currentPokemon['name']}')" class="card-wrapper bg-${currentPokemon["types"]["0"]["type"]["name"]}">
        <img src="${currentPokemon["sprites"]["other"]["dream_world"]["front_default"]}" class="card-image " alt="${currentPokemon['name']}">
        <div class="card-description">
            <h2 class="card-title">${currentPokemon['name'].substring(0, 1).toUpperCase() + currentPokemon['name'].substring(1)} </h2> 
            <p class="card-text"> ${currentPokemon["types"]["0"]["type"]["name"]}</p>                                      
            <p class="card-text">${currentPokemon["types"]["1"]["type"]["name"]}</p>
            <div class="flex-end"><span class=" id-card"># ${currentPokemon["id"]}</span></div>
        </div>
    </div>`
}