<template>
    <div class="option-container">
        <ul>
            <!-- Mostramos el resultado esperado identificado por id emitiendo un evento con $emit -->
            <li v-for="pokemon in pokemons" :key="pokemon.id" @click="$emit( 'selection-pokemon', pokemon.id )" >{{ pokemon.name }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    // Manejo de atributos
    props: {
        // Configuracion predeterminadas por el componente al atributo
        pokemons: {
            type: Array,
            required: true,
        }
    }
}
</script>

<style scoped>

ul {
    list-style-type: none;
}
li {
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba( 0, 0, 0, 0.2 );
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
}

li:hover {
    background-color: rgba( 0, 0, 0, 0.05 );
}

.option-container {
    display: flex;
    justify-content: center;
}

</style>