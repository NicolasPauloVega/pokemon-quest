<template>
    <!-- Si no se encuentra un valor -->
    <h1 v-if="!pokemon">Espere un momento porfavor...</h1>

    <div v-else>
        <h1>¿Quien es este pokémon?</h1>

        <!-- Mostrar imagen -->
        <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
        <!-- Mostrar opciones (enviar opciones al componente mediante atributos) -->
        <PokemonOptions :pokemons="pokemonArr" @selection-pokemon="checkAnswer( $event )" />

        <!-- Mensaje de resultado -->
        <template v-if="showAnswer">
            <h2 class="fade-in"> {{ messages }} </h2>
            <button class="fade-in" @click="newGame()">Nuevo juego</button>
        </template>
    </div>
</template>

<script>
// Importar componentes
import PokemonPicture from '@/components/PokemonPicture.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'

// Exportamos el archivo js de la logica de pokemonOptions
import getPokemonOptions from '@/helpers/getPokemonOptions'

export default {
    // Exportar sobre el proyecto
    components: { PokemonPicture, PokemonOptions },
    // Retornamos un objeto mediante la data
    data() {
        // Objeto reactivo
        return {
            pokemonArr: [], // Opciones de pokemon (para escoger)
            pokemon: null, // Pokemon al azar (imagen)
            showPokemon: false, // Mostrar el pokemon
            showAnswer: false, // Determinar si esta bien
            messages: '', // Mostrar mensaje
        }
    },
    methods: {
        // Creamos un metodo asincrono
        async mixPokemonsArr() {
            // Manejando promesas (para obtener las opciones)
            this.pokemonArr = await getPokemonOptions()

            // Mostrar aleatoriamente un pokemon
            const rndInt = Math.floor( Math.random() * 4 )
            this.pokemon = this.pokemonArr[ rndInt ]
        },
        checkAnswer( selectedId ) {
            // Mostramos la imagen del pokemon
            this.showPokemon = true
            // Mostramos el mensaje
            this.showAnswer = true

            // Validamos si el id es el mismo
            if( selectedId === this.pokemon.id ){
                // Mensaje si coincide
                this.messages = `Correcto el pokemon se llama ${ this.pokemon.name }`
            } else {
                // Mensaje si no coincide
                this.messages = `Ups el nombre del pokemon era ${ this.pokemon.name }`
            }
        },
        newGame() {
            // Reiniciamos todo
            this.pokemonArr = []
            this.pokemon = null
            this.showPokemon = false
            this.showAnswer = false
            // Volvemos a iniciar el juego
            this.mixPokemonsArr()
        }
    },
    // Usamos un hook para enganchar o montar todo a nuestro componente
    mounted() {
        this.mixPokemonsArr() // Montamos la funcion
    }
}
</script>

<style>
    html,body {
        background-color: white;
        justify-content: center;
    }
</style>