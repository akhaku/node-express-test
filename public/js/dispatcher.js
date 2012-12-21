define(['chat'], function(chat) {

  /* routes are 'actions', the key is the name of the message sent from the
   * client, the value is a function that takes socket, data
   */
  var routes = {
    receiveChat: chat.receiveChat
  }


  // don't modify this
  var dispatcher = {};
  dispatcher.dispatch = function(socket, payload) {
    if (payload.action in routes) {
      routes[payload.action](socket, payload.data);
    } else {
      console.log('Invalid action ' + payload.action);
    }
  };

  return dispatcher;
});
