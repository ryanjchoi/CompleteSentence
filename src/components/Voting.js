/*
* @Author: Ryan Choi
* @Date:   2018-04-15 19:53:01
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-15 20:43:36
*/

import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';

export default class Voting extends React.Component {

    constructor(props) {
        super(props);
    };

    handleLike = () => {
        console.warn("handleLike");
    };

    handleDisike = () => {
        console.warn("handleDisike");
    };

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this.handleLike}>
                    <Image
                        source={require('./icons8-thumbs-up-50.png')}
                        style={this.like}
                    />
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handleDisike}>
                    <Image
                        source={require('./icons8-thumbs-down-50.png')}
                        style={this.disike}
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
    likeDown: {

    },

    like: {

    },
});