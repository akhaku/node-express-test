define([], function() {
  var me = {};
  me.init = function(socket) {

    window.sendChat = function(text) {
      socket.emit('message', {
        action: 'sendChat',
        data: text
      });
    };

  };

  me.receiveChat = function(socket, data) {
    console.log(data);
  }

  return me;
});
