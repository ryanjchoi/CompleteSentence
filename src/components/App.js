/*
* @Author: Ryan Choi
* @Date:   2018-03-31 09:50:48
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-28 21:13:02
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

        this.state = {
            gameId: 1,
            quote: {},
        };
    };

    componentWillMount() {
        this.beltSeconds = this.getBeltSeconds();
        this.quote = this.getQuote();

        this.setState({
            quote: this.quote,
        });
    };

    getBeltSeconds() {
        return CONSTANTS.BELT_SECONDS.WHITE;
    };

    getQuote = () => {
        this.fetchFirst();

        let quote = SENTENCES.QUOTES[Math.floor(Math.random() * SENTENCES.QUOTES.length)];
        quote.wordCount = quote.sentence.split(" ").length;

        return quote;
    };

    fetchFirst() {
        fetch('http://localhost:3000/api/v1/quotes').then(function (response) {
            // console.log("Ryan response.json() => ", response.json());
            return response.json();
        }).then(function (result) {
            // console.log("Ryan result => ", result);
            // console.log("Ryan result[0].author => ", result[0].author);
            return result;
        });
    };

    getSeconds(sentence: String) {
        return Math.ceil(sentence.split(" ").length * this.beltSeconds);
    };

    resetGame = () => {
        this.setState((prevState) => {
            return { gameId: prevState.gameId + 1};
        });
    };

    loadNewQuote = () => {
        this.setState((prevState) => {

            let quote = this.getQuote();
            if (
                quote.sentence === prevState.quote.sentence ||
                quote.wordCount > CONSTANTS.BELT_MAX_WORDS.WHITE
            ) {
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
        let seconds = this.getSeconds(this.state.quote.sentence);

        return (
            <Game
                key={this.state.gameId}
                sentence={this.state.quote.sentence}
                author={this.state.quote.author}
                initialSeconds={seconds}
                onPlayAgain={this.resetGame}
                onNewQuote={this.loadNewQuote}
            />
        );
    }
};
