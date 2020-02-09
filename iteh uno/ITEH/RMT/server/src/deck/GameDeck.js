"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card = require('../card/card');
var Player = require('../player/player');
var GameDeck = /** @class */ (function () {
    function GameDeck(players, topCard, turnValue) {
        this._players = players;
        this._topCard = topCard;
        this._turnValue = turnValue;
    }
    Object.defineProperty(GameDeck.prototype, "players", {
        get: function () {
            return this._players;
        },
        set: function (players) {
            this._players = players;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(GameDeck.prototype, "topCard", {
        get: function () {
            return this._topCard;
        },
        set: function (topCard) {
            this._topCard = topCard;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(GameDeck.prototype, "turnValue", {
        get: function () {
            return this._turnValue;
        },
        set: function (turnValue) {
            this._turnValue = turnValue;
        },
        enumerable: true,
        configurable: true
    });
    return GameDeck;
}());
exports.GameDeck = GameDeck;
