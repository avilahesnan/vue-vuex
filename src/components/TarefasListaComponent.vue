<template>
    <div>

        <div class="row">
            <div class="col-sm-10">
                <h1 class="font-weight-light">Lista de Tarefas</h1>
            </div>
            <div class="col-sm-2">
                <button
                    class="btn btn-primary float-end"
                    @click="exibirFormularioCriarTarefa">
                        <i class="fa-solid fa-plus me-2"></i>
                        <span>Criar</span>
                </button>
            </div>
        </div>

        <h3 class="font-weight-light mt-4">A Fazer ({{ tarefasAFazer.length }})</h3>

        <ul class="list-group" v-if="tarefasAFazer.length > 0">
            <TarefasListaItem
                v-for="tarefa in tarefasAFazer"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionarTarefaParaEdicao" />
        </ul>

        <p v-else>Nenhuma tarefa a fazer.</p>

        <h3 class="font-weight-light mt-4">Concluídas ({{ totalTarefasConcluidas }})</h3>

        <ul class="list-group" v-if="tarefasConcluidas.length > 0">
            <TarefasListaItem
                v-for="tarefa in tarefasConcluidas"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionarTarefaParaEdicao" />
        </ul>

        <p v-else>Nenhuma tarefa concluída.</p>

        <TarefaSalvar 
            v-if="exibirFormulario"
            :tarefa="tarefaSelecionada" />
        
    </div>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex'

import TarefaSalvar from '@/components/TarefaSalvarComponent.vue'
import TarefasListaItem from '@/components/TaferasListaItemComponent.vue'

export default {
    components: {
        TarefaSalvar,
        TarefasListaItem
    },
    data() {
        return {
            exibirFormulario: false,
            tarefaSelecionada: undefined
        }
    },
    computed: {
        ...mapState(['tarefas']),
        ...mapGetters([
            'tarefasConcluidas',
            'tarefasAFazer',
            'totalTarefasConcluidas'
        ])
    },
    created() {
        setTimeout(() => {
            this.listarTarefas({
                tarefas: [
                    { id: 1, titulo: 'Aprender Vue', concluido: true },
                    { id: 2, titulo: 'Aprender Vue Router', concluido: true },
                    { id: 3, titulo: 'Aprender Vuex', concluido: false }
                ]
            })
        }, 2000)
    },
    methods: {
        ...mapActions(['listarTarefas']),
        exibirFormularioCriarTarefa() {
            if(this.tarefaSelecionada) {
                this.tarefaSelecionada = undefined
                return
            }
            this.exibirFormulario = !this.exibirFormulario
        },
        selecionarTarefaParaEdicao(tarefa) {
            this.exibirFormulario = true
            this.tarefaSelecionada = tarefa
        },
        resetar() {
            this.exibirFormulario = false
            this.tarefaSelecionada = undefined
        }
    }
}
</script>
