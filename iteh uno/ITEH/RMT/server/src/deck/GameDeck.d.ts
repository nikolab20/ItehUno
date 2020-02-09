declare var Card: any;
declare var Player: any;
export declare class GameDeck {
    private _players;
    private _topCard;
    private _turnValue;
    constructor(players: Array<typeof Player>, topCard: typeof Card, turnValue: number);
    players: Array<typeof Player>;
    topCard: typeof Card;
    turnValue: number;
}
export {};
