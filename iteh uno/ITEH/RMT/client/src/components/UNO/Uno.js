import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Uno.css';
import StyledButton from '../UI/StyledButton/StyledButton';
import DrawButton from '../UI/DrawButton/DrawButton';
import Alert from '../UI/Alert/ALert';
import CardButton from '../UI/CardButton/CardButton';
import UNODialog from '../UI/UNODialog/UNODialog';
import AlertSpinner from '../UI/AlertSpinner/AlertSpinner';
import AlertStandard from '../UI/AlertStandard/AlertStandard';
import * as CardTypes from '../../../public/CardTypes';

var _socketGame = require('socket.io-client')('http://localhost:3000/');
var _gameCode = '12345';
let topCard;
let joined = false;
let table;

class Uno extends Component {

    state = {
        counter: 0,
        tableCounter: 0,
        gameStarted: false,
        newGame: false,
        opponentConn: false,
        join: false,
        numberOfPlayers: 0,
        cards: []
    };

    createGame = () => {
        _socketGame.emit('uno/new', { 'gameCode': _gameCode });

        this.setState({
            newGame: true
        });

        //_socketGame.on('playerJoined', (data) => {
        //    if (data._players.length > 1) {
        //        this.setState({
        //            opponentConn: true,
        //            newGame: false
        //        });
        //    }
        //});
    }

    joinGame = () => {
        this.setState({
            join: true
        });

        _socketGame.emit('uno/join', { 'gameCode': _gameCode, 'player': this.props.username });
        _socketGame.on('playerJoined', (data) => {
            console.log('Player joined', data);

            if (data._players.length === 2) {

                if (data._gameCode === _gameCode) {
                    this.setState({
                        counter: 7,
                        tableCounter: 1,
                        opponentConn: true,
                        gameStarted: true,
                        joined: true
                    });

                    console.log("Usli u metode...");
                    this.showCards(data);
                    this.createDeck();
                    console.log("Usli u metode...");
                }
            }
        });
    };

    playCard = (value, color) => {
        if (value === topCard._value || color === topCard._color || color === 4 || topCard._color === 4) {
            const card = { color: color, value: value };
            _socketGame.emit('uno/playCard', { 'gameCode': _gameCode, 'card': card, 'player': this.props.username });
        };
    };

    showCards = (gameData) => {
        console.log('cards', gameData);

        gameData._players.forEach((player, index) => {

            var karteZaIgraca = [];

            if (player._username === this.props.username) {
                player._cards.forEach((card, index) => {
                    let color;

                    switch (card._color) {
                        case 0:
                            color = 'R'
                            break
                        case 1:
                            color = 'B'
                            break
                        case 2:
                            color = 'Y'
                            break
                        case 3:
                            color = 'G'
                            break
                        case 4:
                            color = 'BL'
                            break
                    };

                    let value;
                    value = card._value
                    switch (card._value) {
                        case 10:
                            value = 'R';
                            break;
                        case 11:
                            value = 'S';
                            break;
                        case 12:
                            value = 'D';
                            break;
                        case 13:
                            value = 'W';
                            break;
                        case 14:
                            value = '+4'
                            break;
                    }

                    console.log(value + color);
                    let path = `../../src/assert/images/Cards/${value}${color}.png`;

                    let btn = <button onClick={() => this.playCard(value, color)} style="../../assert/images/Cards/${value}${color}.png"></button>;

                    // let btn = <CardButton onClick={() => this.playCard(value, color)}>{path} </CardButton>;

                    karteZaIgraca.push(path);

                    this.setState({
                        cards: this.state.cards.concat(`../../src/assert/images/Cards/${value}${color}.png`)
                    })

                });
            }

            console.log(this.state.cards);
        });
    };

    startGame = () => {

        if (this.state.gameStarted) {
            _socketGame.emit('uno/startGame', { 'gameCode': _gameCode });

            _socketGame.on(_gameCode, (data) => {

            });
        };

    };

    


    createDeck = () => {
        _socketGame.on(_gameCode, (data) => {
            topCard = data._topCard;

            let color;

            switch (topCard._color) {
                case 0:
                    color = 'R'
                    break
                case 1:
                    color = 'B'
                    break
                case 2:
                    color = 'Y'
                    break
                case 3:
                    color = 'G'
                    break
                case 4:
                    color = 'BL'
                    break
            };

            let value;
            value = topCard._value
            switch (topCard._value) {
                case 10:
                    value = 'R'
                    break
                case 11:
                    value = 'S'
                    break
                case 12:
                    value = 'D'
                    break
                case 13:
                    value = 'W'
                    break
                case 14:
                    value = '+4'
                    break
            };

            table = <img class="tableCard" className={classes.TableCard} src={`../../assert/images/Cards/${value}${color}.png`} />
        });
    };

    wait = () => {
        _socketGame.emit('uno/wait', { 'gameCode': _gameCode });

        _socketGame.on('twoPlayers', (data) => {
            if (this.props.isLoggedIn)
                console.log("Trenutno " + data + " igraca.");

            /*if (data === 2)
                this.setState({
                    opponentConn: true,
                    gameStarted: true,
                    tableCounter: 1,
                    joined: true
                });*/
        });
    };

    drawCard = () => {
        this.setState({
            gameStarted: true,
            counter: this.state.counter + 1,
            newGame: false
        });
    };

    render() {

        if (!this.state.opponentConn) {
            this.wait();
        }
        if (this.state.opponentConn) {
            if (this.state.tableCounter === 0) {
                if (this.state.gameStarted)
                    table = <div className={classes.TableCard}>No card!</div>
            };
        };

        let uno;
        if (this.state.counter === 1)
            uno = <UNODialog />

        let wait;
        if (this.state.join) {
            if (!this.state.opponentConn)
                wait = <AlertSpinner />
        };

        let _gameStarted = this.state.gameStarted ? <DrawButton variant="contained" onClick={this.state.counter < 10 ? this.drawCard : null}></DrawButton> : null;
        let _opConnected = this.state.opponentConn ? <AlertStandard title="Opponent connected" button="Ok" /> : null;
        let karte = this.state.cards.map((card, index) => {
            <li key={index}><button onClick={() => this.playCard(value, color)} style = "background-image=card"></button>;</li>
        });


            return (
            <div className={classes.Containter}>
                <div className={classes.Title}>UNO</div>

                <div className={classes.Playground}>
                    {_gameStarted}
                    {_opConnected}
                    {table}
                    {wait}
                    {karte}
                    {uno}
                </div>

                <div className={classes.Control}>
                    {this.props.isLoggedIn ? <StyledButton onClick={this.createGame}>Create Game</StyledButton> : null}
                    {this.props.isLoggedIn ? <StyledButton onClick={this.joinGame}>Join Game</StyledButton> : null}
                    <Alert buttonText="How To Play" title="How to play UNO?" text="You can only play a card which has the same color or number or symbol with the card in the center. Wild cards (labelled W) are cards that can alter the color during the play. Draw Two cards (labelled +2) force the opposing side to draw two cards and forfeit his/her turn. Wild Draw Four cards (labelled +4) are basically a wild card and two Draw Two cards. The opposing side is forced to draw four cards and forfeit his/her turn. The user can alter the color during the play in addition. However, you can only play a Wild Draw Four card if you don't have a card that matches the color of the card in the center. Reverse and Skip cards have the same effect in which you can play another card because your opponent's side is reversed or skipped." button="Ok" />
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.token !== null,
        username: state.auth.username
    };
};

export default connect(mapStateToProps)(Uno);
