'use strict';

const fsExtra = require('fs-extra');
const socketIOClient = require('socket.io-client');
const API_URL = 'http://localhost:3000';
const server = socketIOClient.connect(API_URL);

function readFile(file){
  return fsExtra.readFile(file);
}

function convertUppercase(data){
  if (data){
    let text = data.toString().toUpperCase();
    let newText = Buffer.from(text);
    return newText;
  }
}

function writeFile(file, newText){
  return fsExtra.writeFile(file, newText)
    .then(() => {
      console.log(`${file} saved`);
    })
}

const alterFile = (file) => {
  return readFile(file)
    .then(data => convertUppercase(data))
    .then(data => writeFile(file, data))
    .then(() => {
      server.emit('file-save', 'Success! File saved!');
    })
    .catch(error => {
      server.emit('file-error', error);
    });
};

let file = process.argv.slice(2).shift();
alterFile(file);
// server.emit('file-read', file);