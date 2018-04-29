/*
* @Author: Ryan Choi
* @Date:   2018-03-31 09:50:48
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-28 21:57:21
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
        this.fetchFirst();

        let quote = this.getQuote();
        this.setState({
            quote: quote,
        });
    };

    getQuote = (result) => {
        let quote = {};
        if (result === undefined) {
            console.log("Ryan1")
            quote = SENTENCES.QUOTES[Math.floor(Math.random() * SENTENCES.QUOTES.length)];
        } else {
            console.log("Ryan2")
            quote = result[Math.floor(Math.random() * result.length)];
        }

        return quote;
    };

    fetchFirst() {
        fetch('http://localhost:3000/api/v1/quotes').then( (response) => {
            // console.log("Ryan response.json() => ", response.json());
            return response.json();
        }).then( (result) => {
            // console.log("Ryan result => ", result);
            // console.log("Ryan result[0].author => ", result[0].author);
            let quote = this.getQuote(result);

            this.setState({
                quote: quote,
            });
        });
    };

    getSeconds(sentence: String) {
        if (sentence === undefined) {
            return 0;
        }
        return Math.ceil(sentence.split(" ").length * CONSTANTS.BELT_SECONDS.WHITE);
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
                quote.sentence.split(" ").length > CONSTANTS.BELT_MAX_WORDS.WHITE
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
