var chatInfra = io.connect('/chat_infra'),    chatCom = io.connect('/chat_com');chatInfra.on('name_set', function (data) {  chatInfra.on('user_entered', function (user) {    $('#messages').append('<div class="systemMessage">' + user.name + ' has joined the room.</div>');  });  chatInfra.on('message', function (message) {    message = JSON.parse(message);    $('#messages').append('<div class="'+ message.type +'">' + message.message +'</div>');  });  chatCom.on('message', function (data) {    data = JSON.parse(data);    $('#messages').append('<div class="'+ data.type +'"><span class="name">'      + data.username +':</span>'      + data.message +'</div>');  });  $('#nameform').hide();  $('#messages').append('<div class="systemMessage">'+ 'Hello ' + data.name +'</div>');  $('#send').click(function () {    var data = {      name: $('#nickname').val(),      message: $('#message').val(),      type: 'userMessage'    };    chatCom.send(JSON.stringify(data));    $('#message').val('');  });});chatInfra.on('usernames', function (data) {  var html = '';  for (var i = 0; i < data.length; i++) {    html += data[i] + ', ';  }  $('#users').html(html);});$(function() {  $('#setname').click(function () {    chatInfra.emit("set_name", {name: $('#nickname').val()}, function(data) {      if (!data) {        $('#nickError').html('That user is already taken! Try again.');       }    });  });});