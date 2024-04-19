import {
    CRIAR_TAREFA,
    EDITAR_TAREFA,
    DELETAR_TAREFA,
    LISTAR_TAREFAS
} from './mutation-types'

export default {
    [CRIAR_TAREFA]: (state, { tarefa }) => {
        state.tarefas.push(tarefa)
    },
    [EDITAR_TAREFA]: (state, { tarefa }) => {
        const index = state.tarefas.findIndex(t => t.id === tarefa.id)
        state.tarefas.splice(index, 1, tarefa)
    },[DELETAR_TAREFA]: (state, { tarefa }) => {
        const index = state.tarefas.findIndex(t => t.id === tarefa.id)
        state.tarefas.splice(index, 1)
    },
    [LISTAR_TAREFAS]: (state, { tarefas }) => {
        state.tarefas = tarefas
    }
}