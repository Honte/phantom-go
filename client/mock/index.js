const Primus = require('primus');
const actionHandlers = require('./mock');

const primus = Primus.createServer({
  transformer: 'websockets',
  port: 4000
});

primus.on('connection', (spark) => {
  spark.on('data', (data = {}) => {
    const { id, action, payload } = data;

    const handler = actionHandlers[action];

    if (handler) {
      handler(spark, payload, id, action);
    }
  });
});

module.exports = primus;