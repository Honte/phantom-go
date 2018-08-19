import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    games: []
  },
  mutations: {
    updateGames(state, { games, offset, limit }) {
      state.games.splice(offset, limit, ...games);
    },
    updateGame(state, game) {
      const currentGame = state.games.find((g) => g.id === game.id);

      if (currentGame) {
        Object.assign(currentGame, game);
      } else {
        state.games.push(game);
      }
    }
  }
});
