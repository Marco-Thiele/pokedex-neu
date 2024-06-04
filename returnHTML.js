function renderAllPokemonsHTML(color, i, name, id, pokeimg){
return ` <div onclick="showOverlay(${i})" id="pokemon${i}" class="card bg-color-${color}">
<div class="class-position-name">
    <div class="pokemon-name">${name}</div>
    <div class="pokemon-id">#${id}</div>
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
}


function showOverlayHTML(color, name, id, i, pokeimg) {
return `<div id="overlay" onclick="doNotClose(event)" class="overlay bg-color-${color}">
<div class="position-relative">
    <div>
        <div class="overlay-menu">
            <img onclick="closeOverlay()" class="cursor-pointer" src="assets/img/x.ico" alt="">
        </div>
    </div>
    <div class="overlay-position-header">
        <div class="overlay-position-name">
            ${name}
        </div>
        <div class="overlay-position-id">
        #${id}
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
}


function renderAboutInfoHTML(height, weight){
    return `<div class="about-info">
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
</div>`;
}


function renderBaseStatsInfoHTML(name, base_stat, j){
    return  `
    <div class="base-stats-position"> 
    <div class="uppercase">${name}</div>
    <div class="center">${base_stat}</div>
    <div class="max-progress-bar">
        <div id="progress-Bar${j}" class="progress-Bar">
        </div>
    </div>`;
}


function searchPokemonHTML(allPokemon) {
    return `  
    <div>  
        <div class="close-search">
            <img onclick="closeSearch('${allPokemon}')" src="assets/img/x-black.ico" alt="">
        </div>
        <div class="allPokemons" id="renderSearch"></div>
    </div>`;
}