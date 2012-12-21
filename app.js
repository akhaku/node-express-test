
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    dispatcher = require('./routes/dispatcher');
    io = require('socket.io'),
    http = require('http'),
    path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 80);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.set('layout', 'layouts/base');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.engine('html', require('hogan-express'));
});

app.configure('development', function(){
  app.set('port', 8000)
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app);
io = io.listen(server);
server.listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});

io.sockets.on('connection', function(socket) {
  socket.on('message', function(payload) {
    dispatcher.dispatch(socket, payload);
  });
});
