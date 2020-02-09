"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var COLOR = require('./colors');
var VALUES = require('./values');
class Card {
    constructor(value, color) {
        this._value = value;
        this._color = color;
    }
    get color() {
        return this._color;
    }
    ;
    get value() {
        return this._value;
    }
    set color(color) {
        this._color = color;
    }
    set value(value) {
        this._value = value;
    }
}
exports.Card = Card;
//# sourceMappingURL=card.js.map