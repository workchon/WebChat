const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();
let server = http.createServer(app);
var httpServer = http.Server(app);
var SocketIOFile = require('socket.io-file');
var fs = require("fs");
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next) => {
    return res.sendFile(__dirname + '/app.js');
});
app.get('/Archivos', function(req, res) {
    var ser = path.resolve(__dirname, '../data');
    var file = ser + '/' + req.query.archivo;
    res.download(file);

});
app.get('/socket.io.js', (req, res, next) => {
    var ser = path.resolve(__dirname, '../node_modules/socket.io-client/dist/socket.io.js');
    return res.sendFile(ser);
});

app.get('/socket.io-file-client.js', (req, res, next) => {
    var ser = path.resolve(__dirname, '../node_modules/socket.io-file-client/socket.io-file-client.js');
    return res.sendFile(ser);
});
app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
module.exports.SocketIOFile = SocketIOFile;
require('./sockets/socket');



server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});