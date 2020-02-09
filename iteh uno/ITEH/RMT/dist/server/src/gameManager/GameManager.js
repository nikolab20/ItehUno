"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameDeck_1 = require("../deck/GameDeck");
var card_1 = require("../card/card");
var http = require("http");
var mongoose = require("mongoose");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var socketIO = require("socket.io");
var express = require("express");
var player_1 = require("../player/player");
var userRoutes = require('../../api/routes/user');
var GameManager = /** @class */ (function () {
    function GameManager() {
        var _this = this;
        this.games = [];
        this.cards = [];
        this.usedCards = [];
        //createGame
        this.createGame = function (gameCode) {
            var gameDeck = new GameDeck_1.GameDeck(gameCode, [], _this.dealCards(1)[0], -1);
            _this.games.push(gameDeck);
            console.log(_this.games);
            return _this.games;
        };
        //wait
        this.wait = function (gameCode) {
            var _numberOfPlayers = 0;
            _this.games.forEach(function (game, index) {
                if (game.gameCode === gameCode) {
                    _numberOfPlayers = _this.games[index].players.length;
                    console.log(_numberOfPlayers);
                }
            });
            return _numberOfPlayers;
        };
        //joinGame
        this.joinGame = function (gameCode, player, address) {
            var _result = false;
            _this.games.forEach(function (game, index) {
                if (game.gameCode === gameCode) {
                    var _userExist_1 = false;
                    _this.games[index].players.forEach(function (_player, index) {
                        if (_player.id == address) {
                            _userExist_1 = true;
                            _player.username = player;
                        }
                    });
                    var cards = void 0;
                    if (_userExist_1 == false) {
                        cards = _this.dealCards(7);
                        var _newPlayer = new player_1.Player(address, player, cards);
                        _this.games[index].players.push(_newPlayer);
                    }
                    ;
                    _this.io.emit(player, cards);
                    _result = _this.games[index];
                    console.log(_result);
                }
            });
            return _result;
        };
        //dealCards
        this.dealCards = function (cardsToDeal) {
            var _randomCardIndex;
            var _randomCards = [];
            for (var i = 0; i < cardsToDeal; i++) {
                if (_this.cards.length == 0) {
                    _this.shuffle();
                }
                ;
                _randomCardIndex = Math.floor(Math.random() * _this.cards.length);
                _randomCards.push(_this.cards[_randomCardIndex]);
                _this.cards.splice(_randomCardIndex, 1);
            }
            ;
            return _randomCards;
        };
        //playCard
        this.playCard = function (gameCode, playedCard, username) {
            if (username === void 0) { username = false; }
            var _result;
            _this.games.forEach(function (game, index) {
                if (game.gameCode === gameCode) {
                    game.topCard = playedCard;
                    var turnMove = 1;
                    if (game.topCard.value === 11 || game.topCard.value === 10) {
                        turnMove = 2;
                    }
                    game.turnValue = turnMove;
                    switch (game.topCard.value) {
                        case 12:
                            game.players[game.turnValue - 1].cards = game.players[game.turnValue - 1].cards.concat(_this.dealCards(2));
                            break;
                        case 14:
                            game.players[game.turnValue - 1].cards = game.players[game.turnValue - 1].cards.concat(_this.dealCards(4));
                            break;
                    }
                    ;
                    _this.usedCards.push(playedCard);
                    if (username) {
                        game.players.forEach(function (player, index) {
                            if (player.username == username) {
                                for (var i = 0; i < player.cards.length; i++) {
                                    if (player.cards[i].color == playedCard.color && player.cards[i].value == playedCard.value) {
                                        player.cards.splice(i, 1);
                                        i = player.cards.length;
                                    }
                                }
                            }
                        });
                    }
                    _result = game;
                }
            });
            return _result;
        };
        //restartGame
        this.restartGame = function (gameCode) {
        };
        this.app = express();
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));
        //CORS
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        mongoose.connect('mongodb://127.0.0.1:27017/UNO', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
        this.app.use('/user', userRoutes);
        this.server = http.createServer(this.app);
        this.io = socketIO(this.server);
        this.shuffle();
    }
    //shuffle
    GameManager.prototype.shuffle = function () {
        for (var c = 0; c < 4; c++) {
            for (var v = 0; v < 15; v++) {
                var _newCard = new card_1.Card(v, c);
                if (v > 12) {
                    _newCard.color = 4;
                }
                this.cards.push(_newCard);
            }
        }
        this.cards.concat(this.cards);
        return this.cards;
    };
    return GameManager;
}());
exports.GameManager = GameManager;
//# sourceMappingURL=GameManager.js.map