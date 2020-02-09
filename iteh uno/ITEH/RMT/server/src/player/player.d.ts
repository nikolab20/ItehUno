declare var Card: any;
export declare class Player {
    private _id;
    private _username;
    private _cards;
    constructor(id: string, username: string, cards: Array<typeof Card>);
    id: string;
    username: string;
    cards: Array<typeof Card>;
}
export {};
