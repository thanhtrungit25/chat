var io = require('socket.io');

exports.initialize = function(server) {
  io = io.listen(server);

  io.sockets.on("connection", function(socket){

    socket.on('message', function(message){

      message= JSON.parse(message);
      
      if(message.type == "userMessage"){

        if (socket.nickname) {
          message.username = socket.nickname;
          socket.broadcast.send(JSON.stringify(message));
          message.type = "myMessage";
          socket.send(JSON.stringify(message));
        }

      }

    });

    socket.on('set_name', function (data) {

      socket.nickname = data.name;
      socket.emit('name_set', data);
        socket.send(JSON.stringify({type:'serverMessage',
          message: 'Welcome to the most interesting chat room on earth!'}));

    })


  });

}
