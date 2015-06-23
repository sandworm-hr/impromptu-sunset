var app = require('./server/server.js');

var http = require('http').Server(app);

var port = process.env.PORT || 3000;

var io = require('socket.io')(http);


http.listen(port, function() {
  console.log("listening to port ", port);
});

/////////
// socket.io logic
/////////
io.on('connection', function(socket) {
  console.log('new user connected');

  socket.on('disconnect', function() {
    console.log('user disonnected')
  });

  socket.on('postUserUpdate', function(data) {
    console.log(data);
  });
});

// app.listen(port, function(){
//   console.log("listening to port ", port);
// }); 

module.exports = http;