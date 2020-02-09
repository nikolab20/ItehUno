import { Card } from '../card/card';

export class Player {
    private _id: string;
    private _username: string;
    private _cards: Array<Card>;

    constructor(id: string, username: string, cards: Array<Card>) {
        this._id = id;
        this._username = username;
        this._cards = cards;
    }

    get id() {
        return this._id;
    };
    set id(id: string) {
        this._id = id;
    };
    get username() {
        return this._username;
    };
    set username(username: string) {
        this._username = username;
    };
    get cards() {
        return this._cards;
    };
    set cards(cards: Array<Card>) {
        this._cards = cards;
    };

}
