var io = require('socket.io');
var sessionMng = require('../modules/sessionManagement');
var nicknames = [];

exports.initialize = function(server) {
  io = io.listen(server);

// namspace chat infrastration
  var chatInfra = io.of("/chat_infra")
    .on("connection", function(socket){

      socket.on('set_name', function (data, callback) {

        if (nicknames.indexOf(data.name) != -1) { //exist
          callback(false);
        } else {

          socket.nickname = data.name;
          nicknames.push(socket.nickname);

          socket.emit('name_set', data); // emit event handler to client
          updateNicknames();
          updateBroadcastNicknames();

          socket.send(JSON.stringify({type:'serverMessage',
              message: 'Welcome to the most interesting chat room on earth!'}));
          socket.broadcast.emit('user_entered', data);
        }

      }); // end set_name handler

      function updateNicknames() {
        if (socket.nickname) {
          socket.emit('usernames', nicknames);
        }
      }
      function updateBroadcastNicknames() {
        if (socket.nickname) {
          socket.broadcast.emit('usernames', nicknames);
        }
      }

      socket.on('disconnect', function (data) {
        if (!socket.nickname) return false;
        nicknames.splice(nicknames.indexOf(socket.nickname), 1);
        updateBroadcastNicknames();
      });

    });

// namspace chat communication
    var chatCom = io.of("/chat_com")
      .on("connection", function(socket) {

        socket.on('message', function(message){

          message = JSON.parse(message);
          if(message.type == "userMessage"){

            if (message.name) {
              message.username = message.name;

              // broastcast to other client
              socket.broadcast.send(JSON.stringify(message));

              message.type = "myMessage";
              socket.send(JSON.stringify(message));
            }

          }

        }); // end event handler receive message from client

      })

}
