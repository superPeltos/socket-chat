var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('https://proto-socket-chat.herokuapp.com/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket){
    io.emit('chat connection', 'New user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('nickname change',function(nickname){
        io.emit('nickname change', nickname);
    });

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});