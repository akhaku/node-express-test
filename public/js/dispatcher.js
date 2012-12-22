define(['chat', 'draw', 'key'], function(chat, draw, Key) {

  /* routes are 'actions', the key is the name of the message sent from the
   * client, the value is a function that takes socket, data
   */
  var routes = {
    receiveChat: chat.receiveChat
  };

  var keyPressRoutes = [];
  keyPressRoutes[Key.W] = draw.moveUp;
  keyPressRoutes[Key.S] = draw.moveDown;
  keyPressRoutes[Key.A] = draw.moveLeft;
  keyPressRoutes[Key.D] = draw.moveRight;


  // don't modify this
  var dispatcher = {};
  dispatcher.dispatch = function(socket, payload) {
    if (payload.action in routes) {
      routes[payload.action](socket, payload.data);
    } else {
      console.log('Invalid action ' + payload.action);
    }
  };

  dispatcher.dispatchKeyPress = function(key, ctx) {
    if (key in keyPressRoutes) {
      keyPressRoutes[key](ctx);
    }
  };

  return dispatcher;
});
