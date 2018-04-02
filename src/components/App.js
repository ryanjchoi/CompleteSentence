/*
* @Author: Ryan Choi
* @Date:   2018-03-31 09:50:48
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-01 17:46:08
*/

import React from 'react';
import Game from './Game';

class App extends React.Component {
    // sentence = "A pessimist sees the difficulty in every opportunity; an optimist sees the opportunity in every difficulty.";
    sentence = "A pessimist sees the difficulty in every opportunity;";
    author = "Winston Churchill";

    render() {
        return (
            <Game sentence={this.sentence} author={this.author} initialSeconds={15} />
        );
    }
}

export default App;