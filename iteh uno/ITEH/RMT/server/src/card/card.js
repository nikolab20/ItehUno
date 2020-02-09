"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var COLOR = require('./colors');
var VALUES = require('./values');
var Card = /** @class */ (function () {
    function Card(value, color) {
        this._value = value;
        this._color = color;
    }
    Object.defineProperty(Card.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (color) {
            this._color = color;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Card.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    return Card;
}());
exports.Card = Card;
