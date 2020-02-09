"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var socketIO = require("socket.io");
var express = require("express");
var userRoutes = require('../../api/routes/user');
var GameManager = /** @class */ (function () {
    function GameManager() {
        this.game = [];
        this.cards = [];
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
        //CORS
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        mongoose.connect('mongodb://127.0.0.1:27017/UNO', { useNewUrlParser: true, useCreateIndex: true });
        this.app.use('/user', userRoutes);
        this.server = http.createServer(this.app);
        this.io = socketIO(this.server);
    }
    return GameManager;
}());
exports.default = new GameManager();
