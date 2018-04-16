/*
* @Author: Ryan Choi
* @Date:   2018-04-15 19:53:01
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-04-16 12:29:40
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

    getStorageVote = async (key) => {
        try {
            let likeVote = parseInt(await AsyncStorage.getItem(key));
            console.log("likeVote: " + likeVote);


            // return likeVote;
            return 1;
        } catch (error) {
            console.log(error);
        }
    };

    increaseDisike = () => {
        let dislikeVote = 1;

        AsyncStorage.setItem("dislikeVote", dislikeVote.toString());
        this.setState({
            dislikeVote: dislikeVote
        });

    };

    increaseLike = async () => {
        var oldLikeVote;
        try {
            oldLikeVote = parseInt(await AsyncStorage.getItem("likeVote"));
            console.log("oldLikeVote: " + oldLikeVote);

        } catch (error) {
            console.log(error);
        }

        let likeVote = (oldLikeVote || parseInt(this.state.likeVote)) + 1;
            console.log("likeVote: " + likeVote);

        AsyncStorage.setItem("likeVote", likeVote.toString());
        this.setState({
            likeVote: likeVote
        });


    };

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.increaseLike}>
                    <Image
                        source={require('./icons8-thumbs-up-50.png')}
                        style={this.like}
                    />
                </TouchableOpacity>
                <Text>"likeVote: " {this.state.likeVote}</Text>
                <TouchableOpacity onPress={this.increaseDisike}>
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
    likeVote: PropTypes.number,
    dislikeVote: PropTypes.number,
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