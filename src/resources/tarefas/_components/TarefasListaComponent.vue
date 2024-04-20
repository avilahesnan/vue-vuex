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
                @editar="selecionarTarefaParaEdicao"
                @concluir="concluirTarefa({ tarefa: $event })"
                @deletar="confirmarRemocaoTarefa" />
        </ul>

        <p v-else>Nenhuma tarefa a fazer.</p>

        <h3 class="font-weight-light mt-4">Concluídas ({{ totalTarefasConcluidas }})</h3>

        <ul class="list-group" v-if="tarefasConcluidas.length > 0">
            <TarefasListaItem
                v-for="tarefa in tarefasConcluidas"
                :key="tarefa.id"
                :tarefa="tarefa"
                @editar="selecionarTarefaParaEdicao"
                @concluir="concluirTarefa({ tarefa: $event })"
                @deletar="confirmarRemocaoTarefa" />
        </ul>

        <p v-else>Nenhuma tarefa concluída.</p>

        <TarefaSalvar 
            v-if="exibirFormulario"
            @salvar="salvarTarefa" />

        <div class="alert alert-danger" v-if="erro">{{ erro.message }}</div>
        
    </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'

import register from '@/resources/tarefas/_store/register'
import TarefaSalvar from '@/resources/tarefas/_components/TarefaSalvarComponent.vue'
import TarefasListaItem from '@/resources/tarefas/_components/TaferasListaItemComponent.vue'

const { mapActions, mapGetters, mapState } = createNamespacedHelpers('tarefas')

export default {
    components: {
        TarefaSalvar,
        TarefasListaItem
    },
    data() {
        return {
            exibirFormulario: false
        }
    },
    computed: {
        ...mapState([
            'erro',
            'tarefaSelecionada'
        ]),
        ...mapGetters([
            'tarefasConcluidas',
            'tarefasAFazer',
            'totalTarefasConcluidas',
            'boasVindas'
        ])
    },
    created() {
        register(this.$store)
        this.listarTarefas()
    },
    methods: {
        ...mapActions([
            'concluirTarefa',
            'criarTarefa',
            'editarTarefa',
            'deletarTarefa',
            'listarTarefas',
            'selecionarTarefa',
            'resetarTarefaSelecionada'
        ]),
        confirmarRemocaoTarefa(tarefa) {
            const confirmar = window.confirm(`Deseja deletar a tarefa ${tarefa.titulo}?`)
            if(confirmar) {
                this.deletarTarefa({ tarefa })
            }
        },
        exibirFormularioCriarTarefa() {
            if(this.tarefaSelecionada) {
                this.resetarTarefaSelecionada()
                return
            }
            this.exibirFormulario = !this.exibirFormulario
        },
        async salvarTarefa(event) {
            switch (event.operacao) {
                case 'criar':
                    await this.criarTarefa({ tarefa: event.tarefa })
                    break
                case 'editar':
                    await this.editarTarefa({ tarefa: event.tarefa })
                    break
            }
            this.resetar()
        },
        selecionarTarefaParaEdicao(tarefa) {
            this.exibirFormulario = true
            this.selecionarTarefa({ tarefa })
        },
        resetar() {
            this.exibirFormulario = false
            this.resetarTarefaSelecionada()
        }
    }
}
</script>
