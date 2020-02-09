"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(id, username, cards) {
        this._id = id;
        this._username = username;
        this._cards = cards;
    }
    Object.defineProperty(Player.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Player.prototype, "username", {
        get: function () {
            return this._username;
        },
        set: function (username) {
            this._username = username;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Player.prototype, "cards", {
        get: function () {
            return this._cards;
        },
        set: function (cards) {
            this._cards = cards;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=player.js.map