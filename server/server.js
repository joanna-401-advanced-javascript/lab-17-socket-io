'use strict';

const socketIOServer = require('socket.io')(3000);

socketIOServer.on('connection', socket => {
  console.log('Connected', socket.id);

  socket.on('message', message => {
    socket.broadcast.emit('message', message);
  });

  socket.on('file-save', payload => {
    socket.broadcast.emit('file-save', payload);
  });

  socket.on('file-error', payload => {
    socket.broadcast.emit('file-error', payload);
  });
});

console.log('Server is up on port 3000');