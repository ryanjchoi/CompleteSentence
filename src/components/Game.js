/*
* @Author: Ryan Choi
* @Date:   2018-03-31 10:16:15
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-06 16:44:46
*/
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import shuffle from 'lodash.shuffle';
import RandomWord from './RandomWord';

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIds: [],
            remainingSeconds: this.props.initialSeconds,
        };
    }

    gameStatus = 'PLAYING';

    words = this.props.sentence.split(' ');

    shuffledWords = shuffle(this.words);

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
    };

    componentWillUnmount() {
        clearInterval(this.intervalId);
    };

    componentWillUpdate(nextProps, nextState) {
        if (
            nextState.selectedIds !== this.state.selectedIds ||
            nextState.remainingSeconds === 0
        ) {
            this.gameStatus = this.calcGameStatus(nextState);

            if (this.gameStatus !== 'PLAYING') {
                clearInterval(this.intervalId);
            }
        };
    }

    getMergeSelected = (nextState = this.state) => {
        const defaultMessage = 'Please select words below to complete a sentence.';
        const mergeSelected = nextState.selectedIds.reduce((acc, curr) => {
            if(acc === defaultMessage) {
                acc = "";
            }
            return `${acc} ${this.shuffledWords[curr]}`.trim();
        },  defaultMessage);

        return mergeSelected;
    };

    // gameStatus: PLAYING, WON, LOST
    calcGameStatus = (nextState) => {
        const mergeSelected = this.getMergeSelected(nextState);

        if (nextState.remainingSeconds === 0) {
            return 'LOST';
        }
        if (mergeSelected.split(" ").length < this.words.length) {
            return 'PLAYING';
        }
        if (mergeSelected === this.props.sentence) {
            return 'WON';
        } else {
            return 'LOST';
        }
    }

    isNumberSelected = (wordIndex) => {
        return this.state.selectedIds.indexOf(wordIndex) >= 0;
    };

    selectWord = (wordIndex) => {
        this.setState((prevState) => ({
            selectedIds: [...prevState.selectedIds, wordIndex],
        }));
    };

    render() {
        const gameStatus = this.gameStatus;

        return (
            <View style={styles.container}>
                <Text style={styles.sentence}>{this.props.sentence}</Text>
                <Text style={[styles.merged, styles[`STATUS_${gameStatus}`]]}>
                    {this.getMergeSelected()}
                </Text>
                <Text style={styles.author}>- {this.props.author} -</Text>
                <View style={styles.wordsContainer}>
                    {this.shuffledWords.map((randomWord, index) =>
                        <RandomWord
                            key={index}
                            id={index}
                            word={randomWord}
                            isDisabled={
                                this.isNumberSelected(index) || gameStatus !== 'PLAYING'
                            }
                            onPress={this.selectWord}
                        />
                    )}
                </View>
                {this.gameStatus !== 'PLAYING' && (
                    <Button title="Play Again" onPress={this.props.onPlayAgain} />
                )}
                <Text>{this.state.remainingSeconds}</Text>
            </View>
        )
    }
}

Game.propTypes = {
    sentence: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
};

Game.defaultProps = {

};

const styles = StyleSheet.create({
    container: {

    },

    sentence: {
        fontSize: 20,
        // backgroundColor: '#bbb',
        color: '#ddd',
        marginHorizontal: 10,
        textAlign: 'center',
        marginTop: '10%',
    },

    merged: {
        fontSize: 20,
        backgroundColor: '#bbb',
        marginHorizontal: 10,
        textAlign: 'center',
        marginTop: '1%',
    },

    author: {
        fontSize: 20,
        backgroundColor: '#bbb',
        marginHorizontal: 10,
        textAlign: 'center',
        marginTop: '1%',
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
})
