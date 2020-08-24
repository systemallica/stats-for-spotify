import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined,
    checked: true
  },

  getters: {},

  mutations: {
    saveUser(state, user) {
      state.user = user
    },
    updateChecked(state, checked){
      state.checked = checked
    }
  },

  actions: {}
})
