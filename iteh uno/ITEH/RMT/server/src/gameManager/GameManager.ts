import { GameDeck }  from '../deck/GameDeck';
import { Card } from '../card/card';
import * as path from 'path';
import * as http from 'http';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as socketIO from 'socket.io';
import * as express from 'express';
import { Player } from '../player/player';
var userRoutes = require('../../api/routes/user');

class GameManager {
    public app : express.Application;
    public server : http.Server;
    public io: socketIO.Server;
    public games: Array<GameDeck> = [];
    public cards: Array<Card> = [];
    public usedCards: Array<Card> = [];
    private turn: number;

    constructor() {
        this.app = express();
        this.app.set('port', process.env.PORT || 3000);

        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(morgan('dev'));

        //CORS
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        mongoose.connect('mongodb://127.0.0.1:27017/UNO', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
        this.app.use('/user', userRoutes);

        this.server = http.createServer(this.app);
        
        this.io = socketIO(this.server);

        this.shuffle();
    }

    //shuffle
    public shuffle(): Array<any> {
        for (let c = 0; c < 4; c++) {
            for (let v = 0; v < 15; v++) {
                let _newCard: Card = new Card(v, c);
                if (v > 12) {
                    _newCard.color = 4;
                }

                this.cards.push(_newCard)
            }
        }
        this.cards.concat(this.cards)
        return this.cards
    }

    //createGame
    public createGame = (gameCode: string): Array<GameDeck> => {
        let gameDeck = new GameDeck(gameCode, [], this.dealCards(1)[0], -1);
        this.games.push(gameDeck);
        console.log(this.games);

        return this.games;
    };

    //wait
    public wait = (gameCode: string) => {
        let _numberOfPlayers = 0;

        this.games.forEach((game, index) => {
            if (game.gameCode === gameCode) {

                _numberOfPlayers = this.games[index].players.length;

                console.log(_numberOfPlayers);
            }
        });

        return _numberOfPlayers;
    };

    //joinGame
    public joinGame = (gameCode: string, player: string, address: string): GameDeck | boolean => {
        let _result: any = false;

        this.games.forEach((game, index) => {
            if (game.gameCode === gameCode) {
                let _userExist: boolean = false; 

                this.games[index].players.forEach((_player, index) => {
                    if (_player.id == address) {
                        _userExist = true;
                        _player.username = player;
                    }
                });

                let cards: Array<Card>;
                if (_userExist == false) {
                    cards = this.dealCards(7);

                    let _newPlayer = new Player(address, player, cards);
                    this.games[index].players.push(_newPlayer);
                };

                this.io.emit(player, cards);
                _result = this.games[index];
                console.log(_result);
            }
        });

        
        return _result;
    };

    //dealCards
    public dealCards = (cardsToDeal: number): Array<Card> => {
        let _randomCardIndex: number;
        let _randomCards: Array<any> = [];

        for (let i = 0; i < cardsToDeal; i++) {
            if (this.cards.length == 0) {
                this.shuffle();
            };
            _randomCardIndex = Math.floor(Math.random() * this.cards.length);
            _randomCards.push(this.cards[_randomCardIndex]);
            this.cards.splice(_randomCardIndex, 1);
        };

        return _randomCards;
    };

    //playCard
    public playCard = (gameCode: string, playedCard: Card, username: any = false): GameDeck => {
        let _result: any;

        this.games.forEach((game, index) => {
            if (game.gameCode === gameCode) {
                game.topCard = playedCard;
                let turnMove: number = 1;
                if (game.topCard.value === 11 || game.topCard.value === 10) {
                    turnMove = 2;
                }
                game.turnValue = turnMove;

                switch (game.topCard.value) {
                    case 12:
                        game.players[game.turnValue - 1].cards = game.players[game.turnValue - 1].cards.concat(this.dealCards(2));
                        break;
                    case 14:
                        game.players[game.turnValue - 1].cards = game.players[game.turnValue - 1].cards.concat(this.dealCards(4));
                        break;
                };

                this.usedCards.push(playedCard);
                if (username) {
                    game.players.forEach((player, index) => {
                        if (player.username == username) {
                            for (let i = 0; i < player.cards.length; i++) {
                                if (player.cards[i].color == playedCard.color && player.cards[i].value == playedCard.value) {
                                    player.cards.splice(i, 1);
                                    i = player.cards.length;
                                }
                            }
                        }
                    });
                }
                _result = game;
            }
        });

        return _result;
    };

    //restartGame
    public restartGame = (gameCode: string) => {

    };
}

export { GameManager };
