const { Actions } = require('../src/consts');
const GAMES = require('./games');

module.exports = {
  [Actions.GAMES](spark, payload, id) {
    spark.write({
      id,
      action: Actions.GAMES,
      payload: getGames(payload)
    });
  },

  [Actions.GAME](spark, payload, id) {
    spark.write({
      id,
      action: Actions.GAME,
      payload: getGame(payload)
    });
  }
};

function getGames(payload = {}) {
  const { limit = 10, offset = 0 } = payload;

  return {
    games: GAMES.slice(offset, offset + limit),
    limit,
    offset
  };
}

function getGame(id) {
  const game = GAMES.find((game) => game.id === id);

  if (!game) {
    return null
  }

  return {
    ...game,
    events: [],
    blackSgf: game.sgf,
    whiteSgf: game.sgf
  };
}