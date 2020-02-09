import * as express from 'express';
import * as path from 'path';
import { GameManager } from './server/src/gameManager/GameManager';

var _gameManager = new GameManager();
const port = process.env.PORT || 3000;
_gameManager.app.use(express.static(path.join(__dirname, '../')));

_gameManager.server.listen(port, () => {
    console.log(`Listening on port ${port}`);

    _gameManager.io.on('connection', (socket: SocketIO.Socket) => {
        const handshake = socket.handshake.address;
        console.log(`New client connected. Address: ${handshake}`);

        socket.on('uno/new', (data) => {
            _gameManager.createGame(data.gameCode);
        });

        socket.on('uno/join', (data) => {
            _gameManager.io.emit('playerJoined', _gameManager.joinGame(data.gameCode, data.player, handshake));
        });

        socket.on('uno/wait', (data) => {
            _gameManager.io.emit('twoPlayers', _gameManager.wait(data.gameCode));
        });

        socket.on('uno/startGame', (data) => {
            console.log("--------GAME STARTED--------");
            console.log(data);
            _gameManager.io.emit(data.gameCode, _gameManager.playCard(data.gameCode, _gameManager.dealCards(1)[0]));
        });

        socket.on('uno/playCard', (data) => {
            _gameManager.io.emit(data.gameCode, _gameManager.playCard(data.gameCode, data.card, data.player));
        });

        socket.on('uno/restart', (data) => {
            _gameManager.io.emit(data.gameCode, _gameManager.restartGame(data.gameCode));
        });

        socket.on('disconnect', (data) => {
            console.log(`Client disconnected. Address: ${handshake}`);
        });
    });
});
