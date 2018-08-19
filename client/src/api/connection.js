/* global Primus */

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export default function createConnection(url) {
  // establish connection
  const primus = Primus.connect(url);
  const pendingActions = {};

  primus.on('data', (data) => {
    const { payload, id} = data;

    if (pendingActions[id]) {
      pendingActions[id](payload);
    }
  });

  return {
    primus,
    isPending,
    requestData
  };

  /**
   * Informs if there's any request pending
   *
   * @returns {boolean}
   */
  function isPending() {
    return Object.keys(pendingActions).length > 0;
  }

  /**
   * Creates identifiable request, sends it to server and awaits for response.
   *
   * @param {string} action
   * @param {*} payload
   * @returns {Promise<*>}
   */
  function requestData(action, payload) {
    const id = generateId();

    primus.emit('loader:show');

    return new Promise((resolve) => {
      pendingActions[id] = resolve;

      primus.write({
        id,
        action,
        payload
      });
    })
      .then((data) => new Promise((res) => setTimeout(res, 1500, data)))
      .finally(() => {
        delete pendingActions[id];

        primus.emit('loader:hide');
      });
  }
}