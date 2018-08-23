import Vue from 'vue'
import Vuex from 'vuex'

import estudiantes from './estudiantes'
import audience from './audience'

import VueResource from 'vue-resource'
Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    estudiantes,
    audience
  }
})

export default store
