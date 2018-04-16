/*
* @Author: Ryan Choi
* @Date:   2018-04-15 19:53:01
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-15 20:40:44
*/

import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';

export default class Voting extends React.Component {

    constructor(props) {
        super(props);
    };

    handleThumbsUp = () => {
        console.warn("handleThumbsUp");
    };

    handleThumbsDown = () => {
        console.warn("handleThumbsDown");
    };

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this.handleThumbsUp}>
                    <Image
                        source={require('./icons8-thumbs-up-50.png')}
                        style={this.thumbsUp}
                    />
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handleThumbsDown}>
                    <Image
                        source={require('./icons8-thumbs-down-50.png')}
                        style={this.thumbsDown}
                    />
                </TouchableHighlight>
            </View>
        );
    };
};

Voting.propTypes = {

};

Voting.defaultProps = {

};

const styles = StyleSheet.create({
    thumbsUpDown: {

    },

    thumbsUp: {

    },
});