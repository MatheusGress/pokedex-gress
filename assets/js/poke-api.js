const pokeApi = {}
const baseUrl = 'https://pokeapi.co/api/v2/'

function convertPokeApiDetailToPokemon(pokeApiDetail) {
    const pokemon = new Pokemon()
    pokemon.id = pokeApiDetail.id
    pokemon.name = pokeApiDetail.name

    const types = pokeApiDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeApiDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertPokeApiDetailToPokemonProfile(pokeApiDetail) {
    const pokemonProfile = new PokemonProfile()
    
    const types = pokeApiDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    const stats = pokeApiDetail.stats.map((statSlot) => (statSlot.base_stat))
    const [hp, attack, defense, speed] = stats

    pokemonProfile.id = pokeApiDetail.id
    pokemonProfile.name = pokeApiDetail.name
    pokemonProfile.hp = hp
    pokemonProfile.attack = attack
    pokemonProfile.defense = defense
    pokemonProfile.speed = speed
    pokemonProfile.types = types
    pokemonProfile.type = type
    pokemonProfile.weight = pokeApiDetail.weight
    pokemonProfile.height = pokeApiDetail.height
    pokemonProfile.photo = pokeApiDetail.sprites.other.dream_world.front_default
    
    return pokemonProfile
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 8) => {
    const url = `${baseUrl}pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonProfile = (pokemonId) => {
            return fetch(`${baseUrl}pokemon/${pokemonId}`)
            .then((response) => response.json())
            .then((pokemonDetails) => convertPokeApiDetailToPokemonProfile(pokemonDetails))
}