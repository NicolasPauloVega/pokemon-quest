// Importamos axios
import axios from "axios"

const pokemonApi = axios.create({
    // Llamamos a la API
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

// Exportamos el archivo js
export default pokemonApi