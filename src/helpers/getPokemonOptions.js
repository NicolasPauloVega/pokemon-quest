// Importamos la Api
import pokemonApi from "@/API/PokemonAPI"

// funcion para crear el arreglo
const getPokemons = () => {

    // Creamos un arreglo con 650 espacios
    const pokemonsArr = Array.from( Array(650) )
    // Formateamos el arreglo y sumamos 1 cada vez que se agregue
    return pokemonsArr.map( ( _ , index ) => index + 1 )

}

// funcion para obtener los numeros de cada pokemon (nombre)
const getPokemonOptions = async() => {

    // Lo que hacemos es mesclar los elementos en el arreglo numeros aleatorios
    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5 )
    // Obtenemos los nombres de los primero 4 valores del arreglo
    const pokemons = await getPokemonNames( mixedPokemons.splice( 0, 4 ) )

    // Retornamos el valor deseado
    return pokemons

}

// Funcion para obtener el nombre del pokemon (mediante decestructuracion)
const getPokemonNames = async( [a, b, c, d ] = [] ) => {

    // const resp = await pokemonApi.get(`/1`)
    // console.log( resp.data.name )

    // Creamos una variable que almacenara un arreglo y definirlas
    const promiseArr = [
        // Invocamos al primero poquemos por su numero (Obtener nombre)
        pokemonApi.get( `/${ a }` ),
        pokemonApi.get( `/${ b }` ),
        pokemonApi.get( `/${ c }` ),
        pokemonApi.get( `/${ d }` ),
    ]

    // Disparamos promesas de manera simultanea (esperando un arreglo)
    const [ p1, p2, p3, p4 ] = await Promise.all( promiseArr )
    
    // Retornamos el valor (mediante un arreglo)
    return [
        // Valores a mostrar
        { name: p1.data.name, id: p1.data.id },
        { name: p2.data.name, id: p2.data.id },
        { name: p3.data.name, id: p3.data.id },
        { name: p4.data.name, id: p4.data.id },
    ]
}

// Exportamos la funcion
export default getPokemonOptions