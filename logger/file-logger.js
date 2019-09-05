'use strict';

const socketIOClient = require('socket.io-client');
const API_URL = 'http://localhost:3000';
const server = socketIOClient.connect(API_URL);

server.emit('message', 'file-logger');

server.on('log', message => {
  console.log(message);
});

server.on('file-save', payload => {
  console.log(payload);
});

server.on('file-error', payload => {
  console.log(payload);
});

