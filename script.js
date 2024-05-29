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
    for (let i = 0; i < allPokemons.length-1; i++) {
        const pokemon = allPokemons[i];
        const typ = pokemon.types[0].type.name;
        let color = typeColors[typ] || 'darkblue';
        let pokeimg = pokemon.sprites.other['official-artwork'].front_default;
        container.innerHTML += `  
            <div onclick="showOverlay(${i}, '${color}', '${typ}','${pokemon.name}','${pokemon.id}','${pokeimg}')" id="pokemon${i}" class="card bg-color-${color}">
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
        renderPokemonType(i, 'PokemonType'+i);
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
            <div id="pokemon${i}" onclick="showOverlay(${i}, '${color}', '${typ}','${pokemon.name}','${pokemon.id}','${pokeimg}')" class="card bg-color-${color}">
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
        renderPokemonType(i, 'PokemonType'+i);
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


function showOverlay(i, color, typ, pokemonName, pokemonId, pokeimg) {
    positionOverlay = document.getElementById('positionOverlay');
    positionOverlay.classList.add('overlay-active');
    positionOverlay.innerHTML =
    `<div id="overlay" onclick="doNotClose(event)" class="overlay bg-color-${color}">
    <div class="position-relative">
        <div>
            <div class="overlay-menu">
                <img onclick="closeOverlay()" class="cursor-pointer" src="assets/img/arrow-left.ico" alt="">
            </div>
        </div>
        <div class="overlay-position-header">
            <div class="overlay-position-name">
                ${pokemonName}
            </div>
            <div class="overlay-position-id">
            #${pokemonId}
            </div>
        </div>
        <div id="overlayType" class="overlay-type-position">
            
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

    </div>

</div>`;
renderPokemonType(i, 'overlayType');
    overlay = document.getElementById('overlay');
    overlay.style.display = 'block'
    
}


function closeOverlay() {
    positionOverlay = document.getElementById('positionOverlay');
    overlay = document.getElementById('overlay');
    positionOverlay.classList.remove('overlay-active');
    overlay.style.display = 'none';
}


function doNotClose(event){
    event.stopPropagation();
}

