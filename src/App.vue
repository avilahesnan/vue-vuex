<template>
  <div id="app">
    <div class="container container-fluid">
      <div class="container">
        <h1 class="display-4">Vuex</h1>
        <p class="lead">Padrão de Gerenciamento de Estado Centralizado no Vue.</p>
      </div>
    </div>

    <div class="container">

      <div class="row">
        <div class="col-sm-9 border-end">
          <TarefasLista />
        </div>
        <div class="col-sm-3">
          <Contador />
        </div>
      </div>
      
    </div>

  </div>
</template>

<script>

import Contador from '@/resources/contador/_components/ContadorComponent.vue'
import TarefasLista from '@/resources/tarefas/_components/TarefasListaComponent.vue'

export default {
  components: {
    Contador,
    TarefasLista
  }
}
</script>
