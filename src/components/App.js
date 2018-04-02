/*
* @Author: Ryan Choi
* @Date:   2018-03-31 09:50:48
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-02 07:23:34
*/

import React from 'react';
import Game from './Game';

class App extends React.Component {
    // sentence = "A pessimist sees the difficulty in every opportunity; an optimist sees the opportunity in every difficulty.";
    sentence = "A pessimist sees the difficulty in every opportunity;";
    author = "Winston Churchill";
    seconds = this.sentence.split(" ").length * 2;

    render() {
        return (
            <Game sentence={this.sentence} author={this.author} initialSeconds={this.seconds} />
        );
    }
}

export default App;