function sendChat(socket, data) {
  console.log('received chat ' + data);
  receiveChat(socket, data);
}

function receiveChat(socket, text) {
  socket.broadcast.emit('message', {
    action: 'receiveChat',
    data: text
  });
}

exports.sendChat = sendChat;
