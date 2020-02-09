/// <reference types="node" />
declare var GameDeck: any;
declare var Card: any;
import express = require('express');
import socketIO = require('socket.io');
import http = require('http');
declare class GameManager {
    app: express.Application;
    server: http.Server;
    io: socketIO.Server;
    game: Array<typeof GameDeck>;
    cards: Array<typeof Card>;
    constructor();
}
declare const _default: GameManager;
export default _default;
