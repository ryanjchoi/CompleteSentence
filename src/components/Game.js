/*
* @Author: Ryan Choi
* @Date:   2018-03-31 10:16:15
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-27 21:34:21
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
            selectedWords: [],
            selectedObj: {},
            selectedKeys: [],
            shuffledWords: [],
            shuffledObj: [],
            remainingSeconds: this.props.initialSeconds,
        };

        this.gameStatus = 'PLAYING';
        try {
            this.words = this.props.sentence.split(' ');
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        const shuffledWords = shuffle(this.words);
        const shuffledObj = this.getShuffledObj(shuffledWords);

        this.setState({
            shuffledWords: shuffledWords,
            shuffledObj: shuffledObj,
        });

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
            this.gameStatus = this.calcGameStatus(nextState);

            if (this.gameStatus !== 'PLAYING') {
                clearInterval(this.intervalId);
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    getShuffledObj = (arr) => arr.reduce((acc, cur, i) => {
        acc[i] = cur;
        return acc;
    }, {});

    getMergeSelected = (nextState = this.state) => {
        const defaultMessage = 'Please select words below to complete a sentence.';

        var selectedKeys = this.state.selectedKeys;
        var shuffledObj = this.state.shuffledObj;

        const mergeSelected = nextState.selectedKeys.reduce((accumulator, key) => {
            // Remove the default message when starts
            if (accumulator === defaultMessage) {
                accumulator = '';
            }
            var word = shuffledObj[''+key];
            return `${accumulator} ${word}`.trim();
        }, defaultMessage);

        return mergeSelected;
    }

    // gameStatus: PLAYING, WON, LOST
    calcGameStatus = (nextState) => {
        const { sentence } = this.props;
        const mergeSelected = this.getMergeSelected(nextState);
        console.log("Ryan mergeSelected => ", mergeSelected);

        if (mergeSelected === sentence) {
            return 'WON';
        }

        const re = new RegExp(mergeSelected, 'i');

        if (sentence.search(re) !== 0) {
            return 'LOST';
        }

        if (nextState.remainingSeconds === 0) {
            return 'LOST';
        }

        if (mergeSelected.split(' ').length < this.words.length) {
            return 'PLAYING';
        }

        return 'LOST';
    }

    selectWord = (key) => {
        this.setState((prevState) => ({
            selectedKeys: [...prevState.selectedKeys, key],
        }));

        var shuffledObj = this.state.shuffledObj;
        var size = Object.keys(shuffledObj).length;
        if (size > MAX_WORDS) {
            delete shuffledObj[key];

            this.setState((prevState) => ({
                shuffledObj: shuffledObj,
            }));
        }
    }

    isNumberSelected = (key) => {
        return !!(this.state.selectedObj['' + key]);
    }

    render() {
        var shuffledObj = this.state.shuffledObj;
        return (
            <View style={styles.gameContainer}>
                <Text style={styles.sentence}>{this.props.sentence}</Text>
                <Text style={styles.author}>- {this.props.author}</Text>
                <Text style={[styles.merged, styles[`STATUS_${this.gameStatus}`]]}>
                    {this.getMergeSelected()}
                </Text>
                <View style={styles.wordsContainer}>
                    {
                        Object.keys(shuffledObj).map((key, index) => {
                            return (<RandomWord
                                key={index}
                                id={index}
                                word={shuffledObj[key]}
                                isDisabled={
                                    this.isNumberSelected(key) || this.gameStatus !== 'PLAYING'
                                }
                                onPress={() => this.selectWord(key)}
                            />)
                        })
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
    initialSeconds: propTypes.number.isRequired,
    onPlayAgain: propTypes.func.isRequired,
    onNextQuote: propTypes.func.isRequired,
};

Game.defaultProps = {
    sentence: "",
    author: "",
    initialSeconds: 0,
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
