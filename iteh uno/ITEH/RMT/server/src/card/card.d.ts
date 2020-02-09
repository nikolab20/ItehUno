declare var COLOR: any;
declare var VALUES: any;
export declare class Card {
    private _color;
    private _value;
    constructor(value: typeof VALUES, color: typeof COLOR);
    color: typeof COLOR;
    value: typeof VALUES;
}
export {};
