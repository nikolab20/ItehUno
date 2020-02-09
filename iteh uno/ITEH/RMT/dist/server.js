"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var GameManager_1 = require("./server/src/gameManager/GameManager");
var _gameManager = new GameManager_1.GameManager();
var port = process.env.PORT || 3000;
_gameManager.app.use(express.static(path.join(__dirname, '../')));
_gameManager.server.listen(port, function () {
    console.log("Listening on port " + port);
    _gameManager.io.on('connection', function (socket) {
        var handshake = socket.handshake.address;
        console.log("New client connected. Address: " + handshake);
        socket.on('uno/new', function (data) {
            _gameManager.createGame(data.gameCode);
        });
        socket.on('uno/join', function (data) {
            _gameManager.io.emit('playerJoined', _gameManager.joinGame(data.gameCode, data.player, handshake));
        });
        socket.on('uno/wait', function (data) {
            _gameManager.io.emit('twoPlayers', _gameManager.wait(data.gameCode));
        });
        socket.on('uno/startGame', function (data) {
            console.log("--------GAME STARTED--------");
            console.log(data);
            _gameManager.io.emit(data.gameCode, _gameManager.playCard(data.gameCode, _gameManager.dealCards(1)[0]));
        });
        socket.on('uno/playCard', function (data) {
            _gameManager.io.emit(data.gameCode, _gameManager.playCard(data.gameCode, data.card, data.player));
        });
        socket.on('uno/restart', function (data) {
            _gameManager.io.emit(data.gameCode, _gameManager.restartGame(data.gameCode));
        });
        socket.on('disconnect', function (data) {
            console.log("Client disconnected. Address: " + handshake);
        });
    });
});
//# sourceMappingURL=server.js.map