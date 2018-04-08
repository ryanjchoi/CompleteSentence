/*
* @Author: Ryan Choi
* @Date:   2018-03-31 09:50:48
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-08 12:44:59
*/

// hide a warning message in the bottom of the simulator
console.ignoredYellowBox = ['Remote debugger'];

import React from 'react';
import Game from './Game';
import * as CONSTANTS from "./constants";
import * as SENTENCES from "./sentences";

export default class App extends React.Component {

    constructor(props) {
        super(props);
    };

    quote = SENTENCES.QUOTES[Math.floor(Math.random() * SENTENCES.QUOTES.length)];

    currentBelt = CONSTANTS.BELT.YELLOW;

    seconds = Math.ceil(this.quote.sentence.split(" ").length * this.currentBelt);

    getQuote = () => {
        return SENTENCES.QUOTES[Math.floor(Math.random() * SENTENCES.QUOTES.length)];
    }

    state = {
        gameId: 1,
        quote: this.getQuote(),
    };

    resetGame = () => {
        let aQuote = this.getQuote();

        this.setState((prevState) => {
            return { gameId: prevState.gameId + 1};
        });
    };

    loadNewQuote = () => {
        this.setState((prevState) => {
            return {
                gameId: prevState.gameId + 1,
                quote: this.getQuote(),
            };
        });
    };

    render() {
        return (
            <Game
                key={this.state.gameId}
                sentence={this.state.quote.sentence}
                author={this.state.quote.author}
                initialSeconds={this.seconds}
                onPlayAgain={this.resetGame}
                onNewQuote={this.loadNewQuote}
            />
        );
    }
};
