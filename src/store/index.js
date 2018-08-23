import Vue from 'vue'
import Vuex from 'vuex'

import estudiantes from './estudiantes'

import VueResource from 'vue-resource'
Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    estudiantes,
  }
})

export default store
