/*
* @Author: Ryan Choi
* @Date:   2018-03-31 10:16:15
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-24 07:01:27
*/

import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import shuffle from 'lodash.shuffle';
import RandomWord from './RandomWord';
import Voting from './Voting';

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedWords: [],
            shuffledWords: [],
            remainingSeconds: this.props.initialSeconds,
        };

        this.gameStatus = 'PLAYING';
        try {
            this.words = this.props.sentence.split(' ');
        } catch (e) {
            console.log(e);
        }

        this.shuffledWords = shuffle(this.words);
        this.setState({ shuffledWords: this.shuffledWords });
    }

    componentDidMount() {
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

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    componentWillUpdate(nextProps, nextState) {
        if (
            nextState.selectedWords !== this.state.selectedWords ||
            nextState.remainingSeconds === 0
        ) {
            this.gameStatus = this.calcGameStatus(nextState);

            if (this.gameStatus !== 'PLAYING') {
                clearInterval(this.intervalId);
            }
        }
    }

    getMergeSelected = (nextState = this.state) => {
        const defaultMessage = 'Please select words below to complete a sentence.';
        const mergeSelected = nextState.selectedWords.reduce((accumulator, currentValue) => {
            // Remove the default message when starts
            if (accumulator === defaultMessage) {
                accumulator = '';
            }
            return `${accumulator} ${currentValue}`.trim();
        }, defaultMessage);

        return mergeSelected;
    };

    // gameStatus: PLAYING, WON, LOST
    calcGameStatus = (nextState) => {
        const { sentence } = this.props;
        const mergeSelected = this.getMergeSelected(nextState);
        console.log("Ryan mergeSelected => ", mergeSelected);

        if (mergeSelected.split(' ').length < this.words.length) {
            return 'PLAYING';
        }

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

        return 'LOST';
    };

    selectWord = (randomWord) => {
        // this.shuffledWords = words.filter((word) => word !== randomWord);
        this.shuffledWords.splice(
            this.shuffledWords.indexOf(randomWord),
            1
        );
        this.setState((prevState) => ({
            selectedWords: [...prevState.selectedWords, randomWord],
            shuffledWords: this.shuffledWords,
        }));
    };

    render() {
        return (
            <View style={styles.gameContainer}>
                <Text style={styles.sentence}>{this.props.sentence}</Text>
                <Text style={styles.author}>- {this.props.author}</Text>
                <Text style={[styles.merged, styles[`STATUS_${this.gameStatus}`]]}>
                    {this.getMergeSelected()}
                </Text>
                <View style={styles.wordsContainer}>
                    {this.shuffledWords.map((randomWord, index) =>
                        <RandomWord
                            key={index}
                            id={index}
                            word={randomWord}
                            onPress={() => this.selectWord(randomWord)}
                        />
                    )}
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
        )
    };
}

Game.propTypes = {
    sentence: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
    onNextQuote: PropTypes.func.isRequired,
}

Game.defaultProps = {
    sentence: "",
    author: "",
    initialSeconds: 0,
}

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

export default Game
