/*
* @Author: Ryan Choi
* @Date:   2018-03-31 10:16:15
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-06-03 15:39:10
*/

import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
import propTypes from 'prop-types';
import shuffle from 'lodash.shuffle';
import RandomWord from './RandomWord';
import Voting from './Voting';
import { MAX_WORDS } from './constants';

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedKeys: [],
            wordsFullObj: {},
            wordsHeadObj: {},
            wordsTailObj: {},
            remainingSeconds: this.props.initSeconds,
        };

        this.gameStatus = 'PLAYING';
        try {
            this.words = this.props.sentence.split(' ');
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        const wordsHeadArr = shuffle(this.words.slice(0, MAX_WORDS));
        // TODO if wordsTailArr is larger than MAX_WORDS
        const wordsTailArr = shuffle(this.words.slice(MAX_WORDS));
        const wordsFullArr = wordsHeadArr.concat(wordsTailArr);

        const wordsFullObj = this.convertArrToObj(wordsFullArr);
        const wordsHeadObj = this.getSubObj(wordsFullObj, 0, MAX_WORDS-1);
        const wordsTailObj = this.getSubObj(wordsFullObj, MAX_WORDS);

        this.setState({ wordsFullObj, wordsHeadObj, wordsTailObj });

        this.intervalId = setInterval(() => {
            this.setState((prevState) => {
                return { remainingSeconds: prevState.remainingSeconds - 1 };
            }, () => {
                if (this.state.remainingSeconds <= 0) {
                    clearInterval(this.intervalId);
                }
            });
        }, 1000);
    }

    componentWillUpdate(nextProps, nextState) {
        if (
            nextState.selectedKeys !== this.state.selectedKeys
            || this.remainingSeconds <= 0
        ) {
            this.gameStatus = this.getGameStatus(nextState);

            if (this.gameStatus !== 'PLAYING') {
                clearInterval(this.intervalId);
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    getSubObj = (obj, startIndex, endIndex) => {
        let aObj = {};
        endIndex = endIndex || Object.keys(obj).length;
        for (var i in obj) {
            if(i >= startIndex && i <= endIndex) {
                aObj[i] = obj[i];
            }
        }
        return aObj;
    }

    convertArrToObj = (arr) => arr.reduce((acc, cur, i) => {
        acc[i] = cur;
        return acc;
    }, {});

    getMergedSentence = (nextState = this.state) => {
        const defaultMessage = 'Please select words below to complete a sentence.';

        const wordsFullObj = this.state.wordsFullObj;

        const mergedSentence = nextState.selectedKeys.reduce((accumulator, key) => {
            // Remove the default message when starts
            if (accumulator === defaultMessage) {
                accumulator = '';
            }
            const word = wordsFullObj[key];
            return `${accumulator} ${word}`.trim();
        }, defaultMessage);

        return mergedSentence;
    }

    // gameStatus: PLAYING, WON, LOST
    getGameStatus = (nextState) => {
        const { sentence } = this.props;
        const mergedSentence = this.getMergedSentence(nextState);

        if (mergedSentence === sentence) {
            return 'WON';
        }

        const re = new RegExp(mergedSentence, 'i');

        if (sentence.search(re) !== 0) {
            return 'LOST';
        }

        if (nextState.remainingSeconds === 0) {
            return 'LOST';
        }

        if (mergedSentence.split(' ').length < this.words.length) {
            return 'PLAYING';
        }

        return 'LOST';
    }

    replaceKeyValue = (obj, key, newKey, newVal) => {
        let aObj = {};

        for (var i in obj) {
            if(key === i) {
                aObj[newKey] = newVal;
            } else {
                aObj[i] = obj[i];
            }
        }
        return aObj;
    }

    selectWord = (key) => {
        this.setState((prevState) => ({
            selectedKeys: [...prevState.selectedKeys, key],
        }));

        let wordsHeadObj = this.state.wordsHeadObj;
        let wordsTailObj = this.state.wordsTailObj;
        let tailSize = Object.keys(wordsTailObj).length;
        if (tailSize > 0) {
            let tailKeys = Object.keys(wordsTailObj);
            let firstTailKey = tailKeys[0];
            let firstTailValue = wordsTailObj[firstTailKey];

            delete wordsTailObj[firstTailKey];
            wordsHeadObj = this.replaceKeyValue(wordsHeadObj, key, firstTailKey, firstTailValue);

            this.setState({ wordsHeadObj, wordsTailObj });
        }
    }

    isNumberSelected = (key) => (
        this.state.selectedKeys.indexOf(key) !== -1
    )

    render() {
        const wordsHeadObj = this.state.wordsHeadObj;
        return (
            <View style={styles.gameContainer}>
                <Text style={styles.sentence}>{this.props.sentence}</Text>
                <Text style={styles.author}>- {this.props.author}</Text>
                <Text style={[styles.merged, styles[`STATUS_${this.gameStatus}`]]}>
                    {this.getMergedSentence()}
                </Text>
                <View style={styles.wordsContainer}>
                    {
                        Object.keys(wordsHeadObj).map((key, index) => (
                            <RandomWord
                                key={index}
                                id={index}
                                word={wordsHeadObj[key]}
                                isDisabled={
                                    this.isNumberSelected(key) || this.gameStatus !== 'PLAYING'
                                }
                                onPress={() => this.selectWord(key)}
                            />
                        ))
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={styles.remainingSeconds}>{this.state.remainingSeconds}</Text>
                    {this.gameStatus !== 'PLAYING' && (
                        <Button title="Play Again" onPress={this.props.onPlayAgain} />
                    )}
                    <Button title="Next Quote" onPress={this.props.onNextQuote} />
                    <Button title="Reset" onPress={this.props.onPlayAgain} />
                </View>
                <View>
                    <Voting />
                </View>
            </View>
        );
    }
}

Game.propTypes = {
    sentence: propTypes.string.isRequired,
    author: propTypes.string.isRequired,
    initSeconds: propTypes.number.isRequired,
    onPlayAgain: propTypes.func.isRequired,
    onNextQuote: propTypes.func.isRequired,
};

Game.defaultProps = {
    sentence: '',
    author: '',
    initSeconds: 0,
};

const styles = StyleSheet.create({
    gameContainer: {
        display: 'flex',
        flexDirection: 'column',
    },

    buttonContainer: {
        backgroundColor: 'tomato',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    remainingSeconds: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    sentence: {
        fontSize: 20,
        color: '#ddd',
        paddingHorizontal: 12,
        paddingVertical: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    merged: {
        fontSize: 20,
        backgroundColor: '#bbb',
        paddingHorizontal: 12,
        paddingVertical: 3,
        marginTop: '1%',
    },

    author: {
        fontSize: 20,
        marginHorizontal: 10,
    },

    wordsContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },

    STATUS_PLAYING: {
        backgroundColor: '#bbb',
    },
    STATUS_WON: {
        backgroundColor: 'green',
    },
    STATUS_LOST: {
        backgroundColor: 'red',
    },
});

export default Game;
