/*
* @Author: Ryan Choi
* @Date:   2018-03-31 09:50:48
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-04 06:31:17
*/

console.ignoredYellowBox = ['Remote debugger'];

import React from 'react';
import Game from './Game';

class App extends React.Component {
    quotes = [
    {
        // sentence: "A pessimist sees the difficulty in every opportunity; an optimist sees the opportunity in every difficulty.",
        sentence: "An optimist sees the opportunity in every difficulty.",
        author: "Winston Churchill",
    },
    // {
    //     sentence: "Treat a man as he is and he will remain as he is. Treat a man as he can and should be and he will become as he can and should be.",
    //     author: "Stephen R. Covey, The 7 Habits of Highly Effective People: Powerful Lessons in Personal Change"
    // },
    {
        sentence: "Let him who would move the world first move himself.",
        author: "Socrates"
    },
    {
        sentence: "All our knowledge has its origin in our perceptions",
        author: "Leonardo da Vinci"
    },
    {
        sentence: "For the best return on your money, pour your purse into your head.",
        author: "Benjamin Franklin"
    },
    {
        sentence: "Absorb what is useful, Discard what is not, Add what is uniquely your own.",
        author: "Bruce Lee"
    },
    {
        sentence: "Life isn’t about finding yourself. Life is about creating yourself.",
        author: "George Bernard Shaw"
    },
    {
        sentence: "We are what we repeatedly do. Excellence, then, is not an act but a habit.",
        author: "Will Durant"
    },
    {
        sentence: "What we think, we become.",
        author: "Buddha"
    },
    {
        sentence: "I praise loudly; I blame softly.",
        author: "Queen Catherine II"
    },
    ];

    // quote = this.quotes[0];
    quote = this.quotes[Math.floor(Math.random() * this.quotes.length)];

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

    state = {
        gameId: 1,
    };

    getQuote = () => {
        return this.quotes[Math.floor(Math.random() * this.quotes.length)];
    }

    resetGame = () => {
        let aQuote = this.getQuote();

        this.setState((prevState) => {
            return { gameId: prevState.gameId + 1};
        });
    };

    render() {
        return (
            <Game
                key={this.state.gameId}
                sentence={this.quote.sentence}
                author={this.quote.author}
                initialSeconds={this.seconds}
                onPlayAgain={this.resetGame}
            />
        );
    }
}

export default App;