/*
* @Author: Ryan Choi
* @Date:   2018-04-15 19:53:01
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-16 09:12:50
*/

import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

export default class Voting extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            likeVote: 0,
            dislikeVote: 0,
        }
    };

    componentDidMount() {

    };

    handleDisike = () => {
        console.warn("handleDisike");

        let dislikeVote = "1";

        AsyncStorage.setItem("dislikeVote", dislikeVote);
        this.setState({
            dislikeVote: dislikeVote
        });

        this.displayVote("dislikeVote");
    };

    displayVote = async (key) => {
        try {
            let likeVote = await AsyncStorage.getItem(key);
            // alert(likeVote);
        } catch (error) {
            alert(error)
        }
    };

    handleLike = () => {
        console.warn("handleLike");

        let likeVote = "1";

        AsyncStorage.setItem("likeVote", likeVote);
        this.setState({
            likeVote: likeVote
        });

        // this.displayVote("likeVote");
    };

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.handleLike}>
                    <Image
                        source={require('./icons8-thumbs-up-50.png')}
                        style={this.like}
                    />
                </TouchableOpacity>
                <Text>"likeVote: " {this.state.likeVote}</Text>
                <TouchableOpacity onPress={this.handleDisike}>
                    <Image
                        source={require('./icons8-thumbs-down-50.png')}
                        style={this.disike}
                    />
                </TouchableOpacity>
            </View>
        );
    };
};

Voting.propTypes = {
    likeVote: PropTypes.string,
    dislikeVote: PropTypes.string,
};

Voting.defaultProps = {
    likeVote: 0,
    dislikeVote: 0,
};

const styles = StyleSheet.create({
    likeDown: {

    },

    like: {

    },
});