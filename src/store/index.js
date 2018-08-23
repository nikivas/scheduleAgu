import Vue from 'vue'
import Vuex from 'vuex'

import estudiantes from './estudiantes'
import audience from './audience'
import teacher from './teacher'
import helper from './helper'
import VueResource from 'vue-resource'
Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    estudiantes,
    audience,
    teacher,
    helper
  }
})

export default store
