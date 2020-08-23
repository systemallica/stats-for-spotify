import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined
  },

  getters: {},

  mutations: {
    saveUser(state, user) {
      state.user = user
    }
  },

  actions: {}
})
