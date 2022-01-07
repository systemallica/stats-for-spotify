import { createStore } from "vuex"

const store = createStore({
  state() {
    return {
      user: undefined,
      checked: true
    }
  },

  getters: {},

  mutations: {
    saveUser(state, user) {
      state.user = user
    },
    updateChecked(state, checked) {
      state.checked = checked
    }
  },

  actions: {}
})

export default store
