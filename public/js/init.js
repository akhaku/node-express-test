require(['dispatcher', 'chat'], function(dispatcher, chat) {
  var socket = io.connect("http://localhost:8000");
  socket.on('message', function(payload) {
    dispatcher.dispatch(socket, payload);
  });
  chat.init(socket);
});
