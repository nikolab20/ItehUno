import { COLOR } from './colors';
import { VALUES } from './values';

export class Card {
    private _color: typeof COLOR;
    private _value: typeof VALUES;

    constructor(value: typeof VALUES, color: typeof COLOR){
        this._value = value;
        this._color = color;
    }

    get color() {
        return this._color;
    };

    get value() {
        return this._value;
    }

    set color(color: typeof COLOR) {
        this._color = color;
    }

    set value(value: typeof VALUES) {
        this._value = value;
    }
}
