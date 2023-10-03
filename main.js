// Swal.fire(
//     'The Internet?',
//     'That thing is still around?',
//     'question'
//   )

let myPikachu = document.querySelector("#myPikachu");

myPikachu.addEventListener("click", async () => {
    let res = await (await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")).json();
    let img = res.sprites.front_default;
    // let defaultImg = colocar imagen por defecto


    Swal.fire({
        title: `${res.name}`,
        text: 'Modal with a custom image.',
        // imageUrl: `${res.sprites.front_default}`,
        imageUrl: `${(img) ? img : defaultImg}`,
        html: `
            ${res.stats.map(data => `
                <input 
                    type="range" 
                    id="uno" 
                    value="${data.base_stat}">
                <label for="uno"> 
                    ${data.base_stat} 
                    ${data.stat.name}</label><br>
                    `).join("")}   
        `,
        imageWidth: "80%",
        imageHeight: "80%",
    });
}); 


//---------- traer los pokemones
let loadButton = document.querySelector("#loadPokemon");
let pokemonList = document.querySelector("#pokemonList");
let apiUrl = "https://pokeapi.co/api/v2/pokemon";
let offset = 0;
let limit = 100; // Cantidad de Pokémon a cargar en cada página

//loadButton.addEventListener("click", async () => {
document.addEventListener("DOMContentLoaded", async () => {

    try {
        // Hacer una solicitud a la API para obtener una página de Pokémon
        let response = await fetch(`${apiUrl}?offset=${offset}&limit=${limit}`);
        let data = await response.json();

        // Recorrer la lista de Pokémon y mostrarlos en el elemento pokemonList
        data.results.forEach(async (pokemon) => {
            let pokemonData = await (await fetch(pokemon.url)).json();
            let pokemonName = pokemonData.name;
            let pokemonImage = pokemonData.sprites.front_default;

            let pokemonCard = document.createElement("div");
            pokemonCard.classList.add("pokemon-card");
            pokemonCard.innerHTML = `
                <h2>${pokemonName}</h2>
                <img src="${pokemonImage}" alt="${pokemonName}">
            `;
            pokemonList.appendChild(pokemonCard);
        });

        // Incrementar el offset para la próxima página
        offset += limit;
    } catch (error) {
        console.error("Error al cargar Pokémon:", error);
    }
});
