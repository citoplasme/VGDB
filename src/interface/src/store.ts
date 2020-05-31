import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: "",
    token: "",
    clavToken: "",
    expClavToken: ""
  },
  plugins: [createPersistedState()],
  mutations: {
    guardaExpTokenCLAV(state, exp) {
      state.expClavToken = exp;
    },
    guardaTokenCLAV(state, token) {
      state.clavToken = token;
    },
    guardaTokenUtilizador(state, token) {
      state.token = token;
    },
    guardaNomeUtilizador(state, nome) {
      state.name = nome;
    }
  },
  actions: {}
});
