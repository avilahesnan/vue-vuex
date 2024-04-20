import TarefasService from './../_services/TarefasService'

import * as types from './mutation-types'

export default {
    concluirTarefa: async ({ commit, dispatch }, payload) => {
        try {
            const tarefa = Object.assign({}, payload.tarefa)
            tarefa.concluido = !tarefa.concluido
            dispatch('editarTarefa', { tarefa })
        } catch (error) {
            commit(types.SETAR_ERRO, { error })
        }  
    },
    criarTarefa: async ({ commit }, { tarefa }) => {
        try {
            const response = await TarefasService.postTarefa(tarefa)
            commit(types.CRIAR_TAREFA, { tarefa: response.data })
        } catch (error) {
            commit(types.SETAR_ERRO, { error })
        } 
    },
    editarTarefa: async ({ commit }, { tarefa }) => {
        try {
            const response = await TarefasService.putTarefa(tarefa)
            commit(types.EDITAR_TAREFA, { tarefa: response.data })
        } catch (error) {
            commit(types.SETAR_ERRO, { error })
        }  
    },
    deletarTarefa: async ({ commit }, { tarefa }) => {
        try {
            await TarefasService.deleteTarefa(tarefa.id)
            commit(types.DELETAR_TAREFA, { tarefa })
        } catch (error) {
            commit(types.SETAR_ERRO, { error })
        } 
    },
    listarTarefas: async ({ commit }) => {
        try {
            const response = await TarefasService.getTarefas()
        commit(types.LISTAR_TAREFAS, { tarefas: response.data })
        } catch (error) {
            commit(types.SETAR_ERRO, { error })
        }  
    },
    selecionarTarefa: ({ commit }, payload) => {
        try {
            commit(types.SELECIONAR_TAREFA, payload)
        } catch (error) {
            commit(types.SETAR_ERRO, { error })
        }
    },
    resetarTarefaSelecionada: ({ commit }) => {
        try {
            commit(types.SELECIONAR_TAREFA, { tarefa: undefined })
        } catch (error) {
            commit(types.SETAR_ERRO, { error })
        }
    }
}