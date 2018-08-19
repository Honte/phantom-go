const mock = require('./mock');

module.exports = {
  devServer: {
    before(app) {
      // expose script that will take care of establishing connection
      app.get('/primus', (req, res) => res
        .contentType('text/javascript')
        .send(mock.library())
      );
    }
  }
};
