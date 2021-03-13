import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { items } from './modules/items'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export default new Vuex.Store({
  modules: {
    items
  }
})
