/*
* @Author: Ryan Choi
* @Date:   2018-05-01 14:35:50
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-12 07:00:06
*/
import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Game from './Game';
import * as CONSTANTS from "./constants";
import ajax from '../ajax';

export default class QuoteDetail extends React.Component {
    static propTypes = {
        quotes: PropTypes.array.isRequired,
        initialQuoteData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            quotes: this.props.quotes,
            gameId: 0,
            quote: this.props.initialQuoteData,
        };
    }

    async componentDidMount() {
        const fullQuote = await ajax.fetchQuoteDetail(this.state.quote._id);
        console.log('Ryan fullQuote => ', fullQuote);
        this.setState({
            quote: fullQuote,
        });
    }

    resetGame = () => {
        this.setState((prevState) => {
            return { gameId: prevState.gameId + 1};
        });
    };

    loadNewQuote = () => {
        this.setState((prevState) => {

            let quote = this.state.quote;
            console.log("Ryan quote => ", quote);

            if (
                quote.sentence === prevState.quote.sentence ||
                quote.sentence.split(" ").length > CONSTANTS.BELT_MAX_WORDS.WHITE
            ) {
                // this.loadNewQuote();
                return;
            }

            return {
                gameId: prevState.gameId + 1,
                quote: quote,
            };
        });
    };

    render() {
        const { quote } = this.state;

        const gameProps = {
            key: this.state.gameId,
            sentence: quote.sentence,
            author: quote.author,
            initialSeconds: 30,
            onPlayAgain: this.resetGame,
            onNewQuote: this.loadNewQuote,
        }

        return (
            <Game {...gameProps} />
        );
    }
}

const styles = StyleSheet.create({
    quote: {
        marginHorizontal: 12,
    },
    detail: {
        borderColor: '#bbb',
        borderWidth: 1,
    },
    backlink: {
        marginBottom: 5,
        color: '#22f',
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#ccc',
    },
    info: {
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#bbb',
        borderWidth: 1,
        borderTopWidth: 0,
    },
    sentence: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    footer: {
        flexDirection: 'row',
    },
    author: {
        flex: 2,
        fontSize: 16,
        marginBottom: 5,
    },
    avata: {
        width: 60,
        height: 60,
        backgroundColor: '#ccc',
    },

});
