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
        let colar = typeColors[typ] || 'darkblue';
        container.innerHTML += `  
            <div class="card bg-color-${colar}">
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
