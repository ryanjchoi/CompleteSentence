/*
* @Author: Ryan Choi
* @Date:   2018-03-31 09:50:48
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-07 07:16:48
*/

// hide a warning message in the bottom of the simulator
console.ignoredYellowBox = ['Remote debugger'];

import React from 'react';
import Game from './Game';
import * as CONSTANTS from "./constants";

export default class App extends React.Component {

    constructor(props) {
        super(props);
    };

    quote = CONSTANTS.quotes[Math.floor(Math.random() * CONSTANTS.quotes.length)];

    BELT = {
        WHITE: 10,
        YELLOW: 5,
        GREEN: 3,
        ORANGE: 2,
        BLUE: 1.5,
        RED: 1.3,
        BLACK: 1,
    }

    currentBelt = this.BELT.YELLOW;

    seconds = Math.ceil(this.quote.sentence.split(" ").length * this.currentBelt);

    getQuote = () => {
        return CONSTANTS.quotes[Math.floor(Math.random() * CONSTANTS.quotes.length)];
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
        let aQuote = this.getQuote();

        this.setState((prevState) => {
            return {
                gameId: prevState.gameId + 1,
                quote: aQuote,
            };
        });
    };

    render() {
        // console.log("this.state.quote.sentence: " + this.state.quote.sentence);
        return (
            <Game
                key={this.state.gameId}
                sentence={this.quote.sentence}
                author={this.quote.author}
                initialSeconds={this.seconds}
                onPlayAgain={this.resetGame}
                onNewQuote={this.loadNewQuote}
            />
        );
    }
};
