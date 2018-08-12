import Vue from 'vue'
import Vuex from 'vuex'

import example from './module-example'
import * as module from'../js/loadData.js'
import VueResource from 'vue-resource'
Vue.use(Vuex)
Vue.use(VueResource)

Vue.http.options.xhr = {withCredentials: true}
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
Vue.http.options.crossOrigin = true

Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'

const store = new Vuex.Store({
  modules: {
    example,
    module
  }
})

export default store
