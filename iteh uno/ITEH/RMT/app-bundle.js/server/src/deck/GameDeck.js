"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card = require('../card/card');
var Player = require('../player/player');
class GameDeck {
    constructor(players, topCard, turnValue) {
        this._players = players;
        this._topCard = topCard;
        this._turnValue = turnValue;
    }
    get players() {
        return this._players;
    }
    ;
    set players(players) {
        this._players = players;
    }
    ;
    get topCard() {
        return this._topCard;
    }
    ;
    set topCard(topCard) {
        this._topCard = topCard;
    }
    ;
    get turnValue() {
        return this._turnValue;
    }
    set turnValue(turnValue) {
        this._turnValue = turnValue;
    }
}
exports.GameDeck = GameDeck;
//# sourceMappingURL=GameDeck.js.map