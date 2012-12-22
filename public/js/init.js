require(['jquery', 'dispatcher', 'draw', 'chat'],
    function($, dispatcher, draw, chat) {
  var ctx = $('.test-canvas').get(0).getContext('2d');
  var socket = io.connect('http://localhost:8000');
  socket.on('message', function(payload) {
    dispatcher.dispatch(socket, payload);
  });
  chat.init(socket);
  draw.init(ctx);
  $(document).keypress(function(e) {
    dispatcher.dispatchKeyPress(e.which, ctx);
  });
});
