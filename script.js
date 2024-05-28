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
    for (let i = 0; i < allPokemons.length; i++) {
        const pokemon = allPokemons[i];
        const typ = pokemon.types[0].type.name;
        let color = typeColors[typ] || 'darkblue';
        container.innerHTML += `  
            <div onclick="showOverlay()" id="pokemon${i}" class="card bg-color-${color}">
                <div class="class-position-name">
                    <div class="pokemon-name">${pokemon.name}</div>
                    <div class="pokemon-id">#${pokemon.id}</div>
                </div>
                <div class="position-card-contant">
                    <div class="position-type">
                        <div id="PokemonType${i}" class="pokemon-type-position"></div>   
                    </div>
                    <div class="imges">
                        <img class="pokemon-img" src="${pokemon.sprites.other['official-artwork'].front_default}">
                        <img class="pokeball-img" src="assets/img/pokeball.png">
                    </div>
                </div>        
        </div>`;
        renderPokemonType(i, pokemon);
    }

}


function renderPokemonType(i, pokemon) {
    let PokemonType = document.getElementById(`PokemonType${i}`)
    for (let j = 0; j < pokemon.types.length; j++) {
        const typ = pokemon.types[j];
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
        let colar = typeColors[typ] || 'darkblue';
        container.innerHTML += `  
            <div id="pokemon${i}" class="card bg-color-${colar}">
                <div class="class-position-name">
                    <div class="pokemon-name">${pokemon.name}</div>
                    <div class="pokemon-id">#${pokemon.id}</div>
                </div>
                <div class="position-card-contant">
                    <div class="position-type">
                        <div id="PokemonType${i}" class="pokemon-type-position"></div>   
                    </div>
                    <div class="imges">
                        <img class="pokemon-img" src="${pokemon.sprites.other['official-artwork'].front_default}">
                        <img class="pokeball-img" src="assets/img/pokeball.png">
                    </div>
                </div>        
        </div>`;
        renderPokemonType(i, pokemon);
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


function showOverlay(i, colar, typ, pokemon){
    positionOverlay = document.getElementById('positionOverlay');
    overlay = document.getElementById('overlay');
    positionOverlay.classList.add('overlay-active');
    overlay.style.display = 'block'
}


function closeOverlay(){
    positionOverlay = document.getElementById('positionOverlay');
    overlay = document.getElementById('overlay');
    positionOverlay.classList.remove('overlay-active');
    overlay.style.display = 'none';
}


