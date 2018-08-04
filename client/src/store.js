import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    games: [
      { id: 1, name: 'Sample 1' },
      { id: 2, name: 'Sample 2' },
      { id: 3, name: 'Sample 3' }
    ]
  },
  mutations: {},
  actions: {}
});
