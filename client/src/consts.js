const Actions = {
  // fetch games list
  GAMES: '/games',

  // fetch game details
  GAME: '/game',

  // game actions
  JOIN_GAME: '/game/join',
  LEAVE_GAME: '/game/leave',
  CREATE_GAME: '/game/create',
  GAME_PLAY: '/game/play',

  // public game events
  GAME_CREATED: '/game/created',
  GAME_UPDATE: '/game/updated',
  GAME_REMOVED: '/game/removed',

  // player-only game events
  USER_JOINED: '/game/joined',
  USER_LEFT: '/game/left',
  GAME_EVENT: '/game/event',
};


module.exports = {
  Actions
};