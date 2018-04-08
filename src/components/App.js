/*
* @Author: Ryan Choi
* @Date:   2018-03-31 09:50:48
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-08 17:53:06
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

        this.belt = this.getBelt();
        this.quote = this.getQuote();
        this.seconds = this.getSeconds(this.quote.sentence);

        this.state = {
            gameId: 1,
            quote: this.quote,
            seconds: this.seconds,
        };
    };

    getBelt() {
        return CONSTANTS.BELT.YELLOW;
    };

    getQuote = () => {
        let quote = SENTENCES.QUOTES[Math.floor(Math.random() * SENTENCES.QUOTES.length)];
        quote.seconds = this.getSeconds(quote.sentence)

        return quote;
    };

    getSeconds(sentence: String) {
        return Math.ceil(sentence.split(" ").length * this.belt);
    };

    resetGame = () => {
        this.setState((prevState) => {
            return { gameId: prevState.gameId + 1};
        });
    };

    loadNewQuote = () => {
        this.setState((prevState) => {

            let quote = this.getQuote();
            if(quote.sentence === prevState.quote.sentence) {
                this.loadNewQuote();
                return;
            }

            return {
                gameId: prevState.gameId + 1,
                quote: quote,
            };
        });
    };

    render() {
        return (
            <Game
                key={this.state.gameId}
                sentence={this.state.quote.sentence}
                author={this.state.quote.author}
                initialSeconds={this.state.quote.seconds}
                onPlayAgain={this.resetGame}
                onNewQuote={this.loadNewQuote}
            />
        );
    }
};
