// Función para mostrar las estadísticas del Pokémon en un modal
async function showPokemonStats(pokemonName) {
    try {
        // Hacer una solicitud a la API para obtener los datos del Pokémon
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        let pokemonData = await response.json();

        // Crear el contenido HTML para el modal
        let img = pokemonData.sprites.front_default;
        let defaultImg = "";
        let modalContent = `
            <img src="${img || defaultImg}"  alt="${pokemonData.name}"><br><br>
            ${pokemonData.stats.map((data) => `
                <input 
                    type="range" 
                    value="${data.base_stat}"
                    disabled
                >
                <label>
                    ${data.base_stat} 
                    ${data.stat.name}
                </label><br>
            `).join("")}
        `;

        // Mostrar el modal
        Swal.fire({
            title: `${pokemonData.name}`,
            text: 'Estadísticas del Pokémon',
            html: modalContent,
            imageWidth: "80%",
            imageHeight: "80%",
        });
    } catch (error) {
        console.error("Error al cargar estadísticas del Pokémon:", error);
    }
}

// Traer los Pokémon y mostrarlos en las tarjetas
document.addEventListener("DOMContentLoaded", async () => {
    try {
        let pokemonList = document.querySelector("#pokemonList");
        let apiUrl = "https://pokeapi.co/api/v2/pokemon";
        let offset = 0;
        let limit = 500; // Cantidad de Pokémon a cargar en cada página

        // Hacer una solicitud a la API para obtener una página de Pokémon
        let response = await fetch(`${apiUrl}?offset=${offset}&limit=${limit}`);
        let data = await response.json();

        // Recorrer la lista de Pokémon y mostrarlos en el elemento pokemonList
        data.results.forEach((pokemon) => {
            let pokemonName = pokemon.name;
            let pokemonCard = document.createElement("div");
            pokemonCard.classList.add("pokemon-card");
            pokemonCard.innerHTML = `
                <h2>${pokemonName}</h2>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png" alt="${pokemonName}">
            `;
            // Agregar un evento de clic a la tarjeta de Pokémon para mostrar estadísticas
            pokemonCard.addEventListener("click", () => showPokemonStats(pokemonName));

            pokemonList.appendChild(pokemonCard);
        });

        // Incrementar el offset para la próxima página
        offset += limit;
    } catch (error) {
        console.error("Error al cargar Pokémon:", error);
    }
});

//------------------------------
// Función para desplazarse al final de la página al hacer clic en el botón
document.querySelector("#scrollToBottomButton").addEventListener("click", () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth" // Desplazamiento suave
    });
});

// Función para desplazarse hacia arriba de la página al hacer clic en el botón
document.querySelector("#scrollToTopButton").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Desplazamiento suave
    });
});
