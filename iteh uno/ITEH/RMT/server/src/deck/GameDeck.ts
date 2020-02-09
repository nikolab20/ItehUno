import { Card } from '../card/card';
import { Player } from '../player/player';

export class GameDeck {
    private _gameCode: string;
    private _players: Array<Player>;
    private _topCard: Card;
    private _turnValue: number;

    constructor(gameCode: string, players: Array<Player>, topCard: Card, turnValue: number)
    {
        this._gameCode = gameCode;
        this._players = players;
        this._topCard = topCard;
        this._turnValue = turnValue;
        
    }

    get gameCode(): string {
        return this._gameCode;
    };
    set gameCode(gameCode: string) {
        this._gameCode = gameCode;
    };
    get players() {
        return this._players;
    };
    set players(players: Array<Player>) {
        this._players = players;
    };
    get topCard() {
        return this._topCard;
    };
    set topCard(topCard: Card) {
        this._topCard = topCard;
    };
    get turnValue() {
        return this._turnValue;
    }
    set turnValue(turnValue: number) {
        this._turnValue = turnValue;
    }
}