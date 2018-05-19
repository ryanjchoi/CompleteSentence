/*
* @Author: Ryan Choi
* @Date:   2018-05-01 14:35:50
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-19 13:01:54
*/
import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Game from './Game';
import * as CONSTANTS from './constants';
import ajax from '../ajax';

export default class QuoteDetail extends React.Component {
    static propTypes = {
        quotes: PropTypes.array.isRequired,
        currentQuote: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            quotes: this.props.quotes,
            gameId: 0,
            quote: this.props.currentQuote,
        };
    }

    async componentDidMount() {
        const quote = await ajax.fetchQuoteDetail(this.state.quote._id);
        this.setState({
            quote: quote,
        });
    }

    getQuoteIndex = (quote) => {
        const { quotes } = this.state;
        return quotes.map((element) => element._id).indexOf(quote._id);
    }

    resetGame = () => {
        this.setState((prevState) => {
            return { gameId: prevState.gameId + 1};
        });
    };

    loadNewQuote = () => {
        this.setState((prevState) => {
            const { quotes } = this.state;
            let quote = this.state.quote;

            if (this.qindex === undefined) {
                this.qindex = this.getQuoteIndex(quote);
            }

            quote = quotes[++this.qindex];
            this.setState(quote);

            if (
                quote.sentence === prevState.quote.sentence ||
                quote.sentence.split(' ').length > CONSTANTS.BELT_MAX_WORDS.WHITE
            ) {
                // this.loadNewQuote();
                return;
            }

            return {
                gameId: prevState.gameId + 1,
                quote,
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
        };

        return (
            <View style={styles.detailContainer}>
                <TouchableOpacity onPress={this.props.onBack}>
                    <Text style={styles.backlink}>Back</Text>
                </TouchableOpacity>
                <Game {...gameProps} />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    detailContainer: {
        display: 'flex',
        height: '100%',
    },
    quote: {
        marginHorizontal: 12,
    },
    detail: {
        borderColor: '#bbb',
        borderWidth: 1,
    },
    backlink: {
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
