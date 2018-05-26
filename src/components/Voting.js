/*
* @Author: Ryan Choi
* @Date:   2018-04-15 19:53:01
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-26 16:13:35
*/

import React from 'react';
import propTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

class Voting extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            likeVote: 0,
            dislikeVote: 0,
        };
    }

    componentDidMount() {

    }

    increaseDisike = () => {
        let dislikeVote = 1;

        AsyncStorage.setItem("dislikeVote", dislikeVote.toString());
        this.setState({
            dislikeVote: dislikeVote
        });

    }

    updateVoting = async (key) => {
        var oldLikeVote;
        try {
            oldLikeVote = parseInt(await AsyncStorage.getItem(key));
        } catch (error) {
            console.log(error);
        }

        if (key === "likeVote") {
            let likeVote = (oldLikeVote || parseInt(this.state.likeVote)) + 1;

            AsyncStorage.setItem("likeVote", likeVote.toString());
            this.setState({
                likeVote: likeVote
            });
        }

        if (key === "dislikeVote") {
            let likeVote = (oldLikeVote || parseInt(this.state.dislikeVote)) + 1;

            AsyncStorage.setItem('dislikeVote', dislikeVote.toString());
            this.setState({
                dislikeVote: dislikeVote
            });
        }
    }

    render() {
        return (
            <View style={styles.voteContainer}>
                <TouchableOpacity onPress={() => this.updateVoting('likeVote')}>
                    <Image
                        source={require('../../assets/images/icons8-thumbs-up-50.png')}
                        style={this.like}
                    />
                </TouchableOpacity>
                <Text>"likeVote: " {this.state.likeVote}</Text>
                <TouchableOpacity onPress={() => this.updateVoting('dilikeVote')}>
                    <Image
                        source={require('../../assets/images/icons8-thumbs-down-50.png')}
                        style={this.disike}
                    />
                </TouchableOpacity>
                <Text>"dislikeVote: " {this.state.dislikeVote}</Text>
            </View>
        );
    }
}

Voting.propTypes = {
    likeVote: propTypes.number,
    dislikeVote: propTypes.number,
}

Voting.defaultProps = {
    likeVote: 0,
    dislikeVote: 0,
}

const styles = StyleSheet.create({
    voteContainer: {
        flexDirection: 'row',
        justifyContent: 'center',

    },

    likeDown: {

    },

    like: {

    },
})

export default Voting