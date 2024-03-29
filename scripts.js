let allLoadedPokemon = [];
let currentPokemon;
let loadCounter = 15;
let listOfPokemonNames = [];                                        // loaded all names for search use
let isLoading = false;                                              // don`t allow a new iteration before an existing one is finished


function render() {
    displayOverview();
    fillPokemonNames();
}


async function displayOverview() {                                  // main card loading function
    if (!isLoading) {                                               // doesnt trigger if content is already being loaded into container
        isLoading = true;
        let content = document.getElementById('overview');
        content.innerHTML = '';
        await loadContent();
        isLoading = false;
    }
    else {                                                          // retry if isLoading was still true 
        setTimeout(() => {
            displayOverview();
        }, 50);
    }
}


async function  loadContent() {                                     // loader based on numeric
for (let i = 1; i < loadCounter; i++) {                             // load pokemon from api
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);                                //waiting so the function doesnt continue without this input
    currentPokemon = await response.json();                         // to json so we have a file type we can work with
    allLoadedPokemon.push(currentPokemon);
    renderPokemonOverview();                                        // builds the different pokecards
}
}
 
function renderPokemonOverview() {
    let pokemonEntryBuild = '';                                 // predefined and empty so it can be filled later
    let Types = currentPokemon["types"].length;                 // checking if one or two types are defined
    if (Types < 2) {                                            // use the builder for one or two skills, depending on Types.length
        pokemonEntryBuild += cardGeneratorOne(pokemonEntryBuild)
    }
    else {
        pokemonEntryBuild += cardGeneratorTwo(pokemonEntryBuild)
    }
    document.getElementById('overview').innerHTML += pokemonEntryBuild; // let the different elements be in place before you display it
}


async function fillPokemonNames() {
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=151`;               // 151 is the number of first gen pokemon
    let response = await fetch(url);                                        //waiting so the function doesnt continue without this input
    let responseJsonNames = await response.json();                          // to json so we have a file type we can work with
    for (let i = 0; i < responseJsonNames['results'].length; i++) {
        let name = responseJsonNames['results'][i];
        listOfPokemonNames.push(name);
    }
}


async function searchPokemon() {
    let search = document.getElementById('search').value;
    let content = document.getElementById('overview');
    content.innerHTML = '';
    search = search.toLowerCase();
    if (search == "") {                                              // go back to the initial listing if no search is active
        displayOverview();
        return
    }
    if (!isLoading) {
        isLoading = true;
        await loadContentSearch(search); 
        isLoading = false;                                       // sends the searched phrase to loader
    }
    else {                                                            // retry if isLoading was still true
        setTimeout(() => {
            searchPokemon();
        }, 50);
    }
}


async function loadContentSearch(search) {                                // loader based on word search (not numeric)
    for (let i = 0; i < listOfPokemonNames.length; i++) {
        let pokemon = listOfPokemonNames[i];
        if (pokemon['name'].includes(search)) {
            let url = `${pokemon['url']}`;
            let response = await fetch(url);                   
            currentPokemon = await response.json();            
            allLoadedPokemon.push(currentPokemon);
            renderPokemonOverview();
        }
    }
}


async function loadPokemon(name) {
    showCard();
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

// when add pokemon is triggered, adds 15 more and renders
function addMorePokemon() {                                
    loadCounter = loadCounter + 15;
    displayOverview();
}



// when we are in the bottom of the page then load 15 pokemon more
window.onscroll = function () {
    if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
        addMorePokemon();
    }
  };

   // shows a variety of info on selected pokemon 
function renderPokemonInfo() {                                                                      
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


 // returns html to function (1 skill)
function cardGeneratorOne(pokemonEntryBuild) {         
    return `
    <div id="wrapper" onclick="loadPokemon('${currentPokemon['name']}')" class="card-wrapper bg-${currentPokemon["types"]["0"]["type"]["name"]}">
        <img src="${currentPokemon["sprites"]["other"]["dream_world"]["front_default"]}" class="card-image " alt="${currentPokemon['name']}">
        <div class="card-description">
            <h2 class="card-title">${currentPokemon['name'].substring(0, 1).toUpperCase() + currentPokemon['name'].substring(1)} </h2> 
             <p class="card-text"> ${currentPokemon["types"]["0"]["type"]["name"]}</p>
            <div class="card-id"><span class="id-card"># ${currentPokemon["id"]}</span></div>
        </div>
    </div>`
}


    // returns html to function (2 skills)
function cardGeneratorTwo(pokemonEntryBuild) {      
    return `
    <div id="wrapper" onclick="loadPokemon('${currentPokemon['name']}')" class="card-wrapper bg-${currentPokemon["types"]["0"]["type"]["name"]}">
        <img src="${currentPokemon["sprites"]["other"]["dream_world"]["front_default"]}" class="card-image " alt="${currentPokemon['name']}">
        <div class="card-description">
            <h2 class="card-title">${currentPokemon['name'].substring(0, 1).toUpperCase() + currentPokemon['name'].substring(1)} </h2> 
            <p class="card-text"> ${currentPokemon["types"]["0"]["type"]["name"]}</p>                                      
            <p class="card-text">${currentPokemon["types"]["1"]["type"]["name"]}</p>
            <div class="card-id"><span class="id-card"># ${currentPokemon["id"]}</span></div>
        </div>
    </div>`
}
