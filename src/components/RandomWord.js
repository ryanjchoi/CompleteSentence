/*
* @Author: Ryan Choi
* @Date:   2018-03-31 14:53:35
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-06 17:14:58
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class RandomWord extends React.Component {

    constructor(props) {
        super(props);
    };

    handlePress = () => {
        if (this.props.isDisabled) { return; }
        this.props.onPress(this.props.id);
    };

    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>
                <Text style={[styles.randomWord, this.props.isDisabled && styles.disabled]}>
                    {this.props.word}
                </Text>
            </TouchableOpacity>
        );
    };
};

RandomWord.propTypes = {
    id: PropTypes.number.isRequired,
    word: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    onPress: PropTypes.func.isRequired,
};

RandomWord.defaultProps = {

};

const styles = StyleSheet.create({
    randomWord: {
        backgroundColor: '#999',
        width: 150,
        marginHorizontal: 15,
        marginVertical: 10,
        fontSize: 20,
        textAlign: 'center',
    },

    disabled: {
        opacity: 0.3,
    }
});

