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
    for (let i = 1; i < 21; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJOIN = await response.json();
        allPokemons.push(responseAsJOIN);
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
        container.innerHTML += renderAllPokemonsHTML(color, i, pokemon.name, pokemon.id, pokeimg);
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
        container.innerHTML += renderAllPokemonsHTML(color, i, pokemon.name, pokemon.id, pokeimg); 
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
    positionOverlay.innerHTML = showOverlayHTML(color, pokemon.name, pokemon.id, i, pokeimg);
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
    ifBtnActive(about, baseStats, moves, i);
}


function ifBtnActive(about, baseStats, moves, i){
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
    let height = pokemon.height / 10;
    let weight = pokemon.weight / 100
    info.innerHTML = renderAboutInfoHTML(height, weight);
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
        baseStats.innerHTML += renderBaseStatsInfoHTML(stat.stat.name, stat.base_stat, j);
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
        <div>${move.move.name},</div>`
    });

}


function renderAbilities(pokemon) {
    let abilitis = document.getElementById('abilities');
    pokemon.abilities.forEach(abiliti => {
        abilitis.innerHTML += `
            <div>${abiliti.ability.name}</div>`
    });
}


function searchPokemon(){
    let search = document.getElementById('search').value;
    let allPokemon = document.getElementById('allPokemons');
    search = search.toLowerCase();
    allPokemon.innerHTML = '';
    document.getElementById('btnLoadMore').classList.add('d-none');
    allPokemon.innerHTML = searchPokemonHTML(allPokemon); 
    let cardPlace = document.getElementById('renderSearch');
    renderFilterPokemon(search, cardPlace); 
}


async function renderFilterPokemon(search, cardPlace){
    for (let i = 1; i < 152; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let responseAsJOIN = await response.json();
        let pokeimg = responseAsJOIN['sprites']['other']['official-artwork']['front_default'];
        let pokemon = responseAsJOIN;
        const typ = pokemon.types[0].type.name;
        let color = typeColors[typ] || 'darkblue';
        if (pokemon.name.toLowerCase().includes(search)) {
            cardPlace.innerHTML += renderAllPokemonsHTML(color, i, pokemon.name, pokemon.id, pokeimg); 
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