import { Actions } from '@/consts';
import createConnection from './connection';

const { requestData, isPending, primus } = createConnection('http://localhost:4000');

export default {
  fetchGames(offset = 0, limit = 20) {
    return requestData(Actions.GAMES, {
      offset,
      limit
    });
  },

  fetchGame(id) {
    return requestData(Actions.GAME, Number(id));
  },

  get connection() {
    return primus;
  },

  isPending
};
