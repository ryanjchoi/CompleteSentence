/*
* @Author: Ryan Choi
* @Date:   2018-04-15 19:53:01
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-15 22:09:35
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight,
    AsyncStorage,
} from 'react-native';

export default class Voting extends React.Component {

    constructor(props) {
        super(props);
    };

    componentDidMount() {
        AsyncStorage.getItem("vote").then((value) => {
            this.setState({"vote": value});
        });
    };

    getInitialState() {
        return {};
    };

    handleLike = () => {
        console.warn("handleLike");

        AsyncStorage.setItem("vote", value = "like");
        this.setState({"vote": value});
    };

    handleDisike = () => {
        console.warn("handleDisike");

        AsyncStorage.setItem("vote", value = "dislike");
        this.setState({"vote": value});
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
    vote: PropTypes.string.isRequired,
};

Voting.defaultProps = {

};

const styles = StyleSheet.create({
    likeDown: {

    },

    like: {

    },
});