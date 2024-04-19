<template>
    <div>
        <h2 class="font-weight-light">Contador: {{ contador }}</h2>
        <h4 class="font-weight-light">Contador Alias: {{ contadorAlias }}</h4>
        <h4 class="font-weight-light">Contador Elevado a 2: {{ contadorElevado }}</h4>
        <button
            class="btn btn-lg btn-danger me-1"
            @click="decrementar">
                -
        </button>
        <button
            class="btn btn-lg btn-success"
            @click="incrementar">
                +
        </button>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    data() {
        return {
            contadorLocal: 2
        }
    },
    computed: {
        ...mapState('contador', {
        contador: state => state.contador,
        contadorAlias: state => state.contador,
        contadorElevado(state) {
            return Math.pow(state.contador, this.contadorLocal)
        }
    })
    },
    methods: {
        decrementar() {
            this.$store.state.contador.contador--
        },
        incrementar() {
            this.$store.state.contador.contador++
        }
    }
}
</script>
