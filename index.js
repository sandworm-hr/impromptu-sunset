var app = require('./server/server.js');

var http = require('http').Server(app);

var port = process.env.PORT || 3000;

var io = require('socket.io')(http);

// holds list of users for socket.io
var allUsers = {};

http.listen(port, function() {
  console.log("listening to port ", port);
});

/////////
// socket.io logic
/////////
io.on('connection', function(socket) {


  socket.on('disconnect', function() {
    io.emit('userExit', allUsers[socket.id])
  });

  socket.on('postUserUpdate', function(data) {

    allUsers[socket.id] = data;

    io.emit('getUserUpdate', data);
  });

  socket.on('getAllUsers', function() {
    console.log('about to send all users');
    io.emit('allServerUsers', allUsers);
  });
});

// app.listen(port, function(){
//   console.log("listening to port ", port);
// }); 

module.exports = http;