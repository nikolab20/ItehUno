"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Card = require('../card/card');
class Player {
    constructor(id, username, cards) {
        this._id = id;
        this._username = username;
        this._cards = cards;
    }
    get id() {
        return this._id;
    }
    ;
    set id(id) {
        this._id = id;
    }
    ;
    get username() {
        return this._username;
    }
    ;
    set username(username) {
        this._username = username;
    }
    ;
    get cards() {
        return this._cards;
    }
    ;
    set cards(cards) {
        this._cards = cards;
    }
    ;
}
exports.Player = Player;
//# sourceMappingURL=player.js.map