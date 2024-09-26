const pokemonProfile = document.getElementById('pokemonProfile')
const pokemonId = new URLSearchParams(window.location.search).get('pokemonId');

pokeApi.getPokemonProfile(pokemonId)
    .then((pokeProfile) => {
        document.title = `Meet ${pokeProfile.name}`
        pokemonProfile.innerHTML += `
        <div class="pokemon ${pokeProfile.types[0]}">
            <img src="${pokeProfile.photo}" alt="${pokeProfile.name}"/>
            
            <span class="nameAndHp">
                <p class="name">${pokeProfile.name}</p>
                <p class="hp">${pokeProfile.hp} HP</p>
            </span>
            <div class="profileDetails ${pokeProfile.type}">
                <ol class="physicalProps">
                    <li class="measures">
                        <p class="propValue">${pokeProfile.weight}</p>
                        <p class="propDescription">Weight</p>
                    </li>
                    
                    <li class="typesBox">
                        <ol class="types">
                            ${pokeProfile.types.map((type) => `<li class ="type ${type}">${type}</li>`).join('')}
                        </ol>
                    </li>
                    <li class="measures">
                        <p class="propValue">${pokeProfile.height}</p>
                        <p class="propDescription">Height</p>
                    </li>
                </ol>
                <ol class="battleProps">
                    <li>
                        <p class="propValue">${pokeProfile.attack}</p>
                        <p class="propDescription">Attack</p>
                    </li>

                    <li>
                        <p class="propValue">${pokeProfile.defense}</p>
                        <p class="propDescription">Defense</p>
                    </li>
                </ol>
            </div>
            <div class="goBackButton">
                <button id="goBackButton" class="${pokeProfile.type}" type="button">
                    x
                </button>
            </div>
        </div>
        `
    })
    .then(() => {
        const goBackButton = document.getElementById('goBackButton')
        goBackButton.addEventListener('click', () => {
            window.location.href = `index.html`
        })
    })
