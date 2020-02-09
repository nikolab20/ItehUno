import { COLOR } from './colors';
import { VALUES } from './values';

export class Card {
    private _color: COLOR;
    private _value: VALUES;

    constructor(value: VALUES, color: COLOR){
        this._value = value;
        this._color = color;
    }

    get color() {
        return this._color;
    };

    get value() {
        return this._value;
    }

    set color(color: COLOR) {
        this._color = color;
    }

    set value(value: VALUES) {
        this._value = value;
    }
}
