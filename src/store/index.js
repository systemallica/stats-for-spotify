import { createStore } from "vuex"

export const store = createStore({
  state: {
    user: undefined,
    checked: true
  },
  mutations: {
    saveUser(state, user) {
      state.user = user
    },
    updateChecked(state, checked) {
      state.checked = checked
    }
  }
})
