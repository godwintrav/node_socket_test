const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path')
var cookieParser = require('cookie-parser')

//set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.get('/', (req, res) => {
  var randomNumber=Math.random().toString();
  res.cookie('userId', randomNumber, { maxAge: 900000, httpOnly: false });
  res.sendFile(__dirname + '/index.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/public/about.html');
});

var userNum = 0;

io.on('connection', (socket) => {
  userNum++;
  console.log(socket.id);
  io.emit('user-connected', `----User ${userNum} Connected----`);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('user-id', (msg) => {
    console.log(msg);
  });

  socket.on('user-typing', (msg) => {
    io.emit('user-typing', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});