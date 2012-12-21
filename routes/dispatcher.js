var chat = require('./chat'); // require more modules as we need them

/* routes are 'actions', the key is the name of the message sent from the
 * server, the value is a function that takes socket, data.
 */
var routes = {
  sendChat: chat.sendChat // add more here
};

// don't modify this
exports.dispatch = function(socket, payload) {
  if (payload.action in routes) {
    routes[payload.action](socket, payload.data);
  } else {
    console.log('Invalid action ' + payload.action);
  }
};
