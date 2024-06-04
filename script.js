const typeColors = {
    'grass': 'green',
    'fire': 'red',
    'water': 'blue',
    'bug': 'oliv',
    'normal': 'grey',
    'poison': 'purple',
    'electric': 'yellow',
    'ground': 'sand',
    'fairy': 'pink',
    'fighting': 'darkred',
    'rock': 'brown',
    'psychic': 'orange',
    'ice': 'ice',
    'ghost': 'violet'
};

let allPokemons = [];
let offset = 20;
let limit = 20;
let saveBtn = 1;

async function loadAllPokemons() {
    let container = document.getElementById('allPokemons');
    for (let i = 1; i < 21; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJOIN = await response.json();
        allPokemons.push(responseAsJOIN);
        console.log('alle Pokemon', allPokemons)

    }
    renderAllPokemons();
}


function renderAllPokemons() {
    let container = document.getElementById('allPokemons');
    container.innerHTML = '';
    for (let i = 0; i < allPokemons.length - 1; i++) {
        const pokemon = allPokemons[i];
        const typ = pokemon.types[0].type.name;
        let color = typeColors[typ] || 'darkblue';
        let pokeimg = pokemon.sprites.other['official-artwork'].front_default;
        container.innerHTML += `  
            <div onclick="showOverlay(${i})" id="pokemon${i}" class="card bg-color-${color}">
                <div class="class-position-name">
                    <div class="pokemon-name">${pokemon.name}</div>
                    <div class="pokemon-id">#${pokemon.id}</div>
                </div>
                <div class="position-card-contant">
                    <div class="position-type">
                        <div id="PokemonType${i}" class="pokemon-type-position"></div>   
                    </div>
                    <div class="imges">
                        <img class="pokemon-img" src="${pokeimg}">
                        <img class="pokeball-img" src="assets/img/pokeball.png">
                    </div>
                </div>        
            </div>`;
        renderPokemonType(i, 'PokemonType' + i);
    }

}


function renderPokemonType(i, ID) {
    let PokemonType = document.getElementById(ID)
    for (let j = 0; j < allPokemons[i].types.length; j++) {
        const typ = allPokemons[i].types[j];
        PokemonType.innerHTML += `<div class="pokemon-type">${typ.type.name}</div>`;
    }
}


async function loadMore() {
    let btn = document.getElementById('btnLoadMore');
    let max = limit + offset;
    btn.disabled = true
    for (let i = offset; i < max; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJOIN = await response.json();
        allPokemons.push(responseAsJOIN);
        console.log('neue Pokemon', allPokemons);
    }
    renderNewPokemon(btn);
    offset = offset + limit;
}


function renderNewPokemon(btn) {
    let container = document.getElementById('allPokemons');
    for (let i = offset; i < allPokemons.length; i++) {
        const pokemon = allPokemons[i];
        const typ = pokemon.types[0].type.name;
        let color = typeColors[typ] || 'darkblue';
        pokeimg = pokemon.sprites.other['official-artwork'].front_default;
        container.innerHTML += `  
            <div id="pokemon${i}" onclick="showOverlay(${i})" class="card bg-color-${color}">
                <div class="class-position-name">
                    <div class="pokemon-name">${pokemon.name}</div>
                    <div class="pokemon-id">#${pokemon.id}</div>
                </div>
                <div class="position-card-contant">
                    <div class="position-type">
                        <div id="PokemonType${i}" class="pokemon-type-position"></div>   
                    </div>
                    <div class="imges">
                        <img class="pokemon-img" src="${pokeimg}">
                        <img class="pokeball-img" src="assets/img/pokeball.png">
                    </div>
                </div>        
        </div>`;
        renderPokemonType(i, 'PokemonType' + i);
    }
    btn.disabled = false;
}


document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('btnLoadMore');
    function checkButtonState() {
        if (button.disabled) {
            button.style.backgroundColor = '#787b80'
        } else {
            button.style.backgroundColor = '#333B4A'
        }
    }
    checkButtonState();
    const observer = new MutationObserver(checkButtonState);
    observer.observe(button, { attributes: true, attributeFilter: ['disabled'] });
});


function showOverlay(i) {
    positionOverlay = document.getElementById('positionOverlay');
    positionOverlay.classList.add('overlay-active');
    const pokemon = allPokemons[i];
    const typ = pokemon.types[0].type.name;
    let color = typeColors[typ] || 'darkblue';
    let pokeimg = pokemon.sprites.other['official-artwork'].front_default;
    positionOverlay.innerHTML =
        `<div id="overlay" onclick="doNotClose(event)" class="overlay bg-color-${color}">
    <div class="position-relative">
        <div>
            <div class="overlay-menu">
                <img onclick="closeOverlay()" class="cursor-pointer" src="assets/img/x.ico" alt="">
            </div>
        </div>
        <div class="overlay-position-header">
            <div class="overlay-position-name">
                ${pokemon.name}
            </div>
            <div class="overlay-position-id">
            #${pokemon.id}
            </div>
        </div>
        <div id="overlayType" class="overlay-type-position">
            
        </div>
        <div class="overlay-arrows">
            <div>
                <img class="cursor-pointer" onclick="previousPokemon(${i})" src="assets/img/arrow-left.ico" alt="">
            </div>
            <div>
                <img class="cursor-pointer" onclick="nextPokemon(${i})" src="assets/img/arrow-right.ico" alt="">
            </div>
        </div>
        <div>
            <div class="overlay-pokemon-img">
                <img src="${pokeimg}">
            </div>
            <div class="overlay-position-ballimg">
                <img src="assets/img/pokeball.png" alt="">
            </div>
        </div>
    </div>
    <div class="overlay-info">
        <div>
            <div class="position-btn">
                <button id="about" onclick="about(${i}, 1)">About</button>
                <button id="baseStats" onclick="about(${i}, 2)">Base Stats</button>
                <button id="moves" onclick="about(${i}, 3)">Moves</button>
            </div>
        </div>
        <div id="renderInformations"> 
        </div>
    </div >

</div>`;
    renderPokemonType(i, 'overlayType');
    overlay = document.getElementById('overlay');
    overlay.style.display = 'block'
    checkBtnActive(i);
}


function nextPokemon(i) {
    i++
    newPokemon(i)
}


function previousPokemon(i) {
    if (i >= 1) {
        i--
        newPokemon(i)
    } else {
        i = i
        newPokemon(i)
    }
}


function newPokemon(j) {
    let pokemon = allPokemons[j];
    let typ = pokemon.types[0].type.name;
    let color = typeColors[typ] || 'darkblue';
    let pokeimg = pokemon.sprites.other['official-artwork'].front_default;
    let pokemonName = pokemon.name
    let pokemonId = pokemon.id
    showOverlay(j, color, pokemonName, pokemonId, pokeimg)
}


function closeOverlay() {
    positionOverlay = document.getElementById('positionOverlay');
    overlay = document.getElementById('overlay');
    positionOverlay.classList.remove('overlay-active');
    overlay.style.display = 'none';
}


function doNotClose(event) {
    event.stopPropagation();
}

function about(i, saveBtnNumber) {
    if (saveBtn != saveBtnNumber) {
        saveBtn = saveBtnNumber;
        showOverlay(i);
    }
}


function checkBtnActive(i) {
    const about = document.getElementById('about');
    const baseStats = document.getElementById('baseStats');
    const moves = document.getElementById('moves');
    about.classList.remove('btn-active');
    baseStats.classList.remove('btn-active');
    moves.classList.remove('btn-active');
    if (saveBtn == 1) {
        about.classList.add('btn-active');
        renderAboutInfo(i);
    }

    if (saveBtn == 2) {
        baseStats.classList.add('btn-active');
        renderBaseStatsInfo(i);
    }

    if (saveBtn == 3) {
        moves.classList.add('btn-active');
        renderMovesInfo(i);
    }

}



function renderAboutInfo(i) {
    let info = document.getElementById('renderInformations');
    let pokemon = allPokemons[i];
    console.log('info', pokemon);
    let height = pokemon.height / 10;
    let weight = pokemon.weight / 100
    info.innerHTML =
    `<div class="about-info">
        <div>
            <div class="headline"> Height: </div>
            <div>${height}m</div>
        </div>

        <div>
            <div class="headline"> Weight: </div>
            <div>${weight}kg</div>
        </div>

        <div>
            <div class="headline"> Abilities: </div>
            <div id="abilities"> </div>
        </div>
    </div>`
    renderAbilities(pokemon);
}


function renderBaseStatsInfo(i) {
    let info = document.getElementById('renderInformations');
    let pokemon = allPokemons[i];
    let stats = pokemon.stats;
    info.innerHTML= `<div class="position-info-base" id="infoBaseStats"></div>`
    let baseStats = document.getElementById('infoBaseStats');
    for (let j = 0; j < stats.length; j++) {
        const stat = stats[j];
        baseStats.innerHTML += `
        <div class="base-stats-position"> 
        <div class="uppercase">${stat.stat.name}</div>
        <div class="center">${stat.base_stat}</div>
        <div class="max-progress-bar">
            <div id="progress-Bar${j}" class="progress-Bar">
            </div>
        </div>`
        let newWidth = stat.base_stat / 180*100;
        document.getElementById(`progress-Bar${j}`).style.width = newWidth + '%';    
    }

}



function renderMovesInfo(i) {
    let info = document.getElementById('renderInformations');
    let pokemon = allPokemons[i];
    info.innerHTML = '<div class="moves-info" id="movesInfo"></div>'

    pokemon.moves.forEach(move => {
        document.getElementById('movesInfo').innerHTML += `
        <div>${move.move.name},</div>
        `
    });

}


function renderAbilities(pokemon) {
    let abilitis = document.getElementById('abilities');
    pokemon.abilities.forEach(abiliti => {
        console.log(abiliti.ability.name)
        abilitis.innerHTML += `
            <div>${abiliti.ability.name}</div> 
    `
    });
}


function searchPokemon(){
    let search = document.getElementById('search').value;
    let allPokemon = document.getElementById('allPokemons');
    search = search.toLowerCase();
    allPokemon.innerHTML = '';
    document.getElementById('btnLoadMore').classList.add('d-none');
    allPokemon.innerHTML = `  
    <div>  
        <div class="close-search">
            <img onclick="closeSearch('${allPokemon}')" src="assets/img/x-black.ico" alt="">
        </div>
        <div class="allPokemons" id="renderSearch"></div>
    </div>`;
    let cardPlace = document.getElementById('renderSearch');
    renderFilterPokemon(search, cardPlace); 
}


async function renderFilterPokemon(search, cardPlace){
    for (let i = 1; i < 152; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJOIN = await response.json();
        let name = responseAsJOIN['name'];
        let pokeimg = responseAsJOIN['sprites']['other']['official-artwork']['front_default'];
        let pokemon = responseAsJOIN;
        const typ = pokemon.types[0].type.name;
        let color = typeColors[typ] || 'darkblue';
        if (name.toLowerCase().includes(search)) {
            cardPlace.innerHTML += `
            <div id="pokemon${i}" onclick="showOverlay(${i})" class="card bg-color-${color}">
            <div class="class-position-name">
                <div class="pokemon-name">${pokemon.name}</div>
                <div class="pokemon-id">#${pokemon.id}</div>
            </div>
            <div class="position-card-contant">
                <div class="position-type">
                    <div id="PokemonType${i}" class="pokemon-type-position"></div>   
                </div>
                <div class="imges">
                    <img class="pokemon-img" src="${pokeimg}">
                    <img class="pokeball-img" src="assets/img/pokeball.png">
                </div>
            </div>        
            </div>
            `; 
            renderFilterPokemonType(i, 'PokemonType' + i, pokemon);
        }
    }
    
}


function closeSearch(allPokemon){
    document.getElementById('search').value = ''
    allPokemon.innerHTML = '';
    document.getElementById('btnLoadMore').classList.remove('d-none');
    renderAllPokemons();
}


function renderFilterPokemonType(i, ID, pokemon) {
    let PokemonType = document.getElementById(ID)
    for (let j = 0; j < pokemon.types.length; j++) {
        const typ = pokemon.types[j];
        PokemonType.innerHTML += `<div class="pokemon-type">${typ.type.name}</div>`;
    }
}