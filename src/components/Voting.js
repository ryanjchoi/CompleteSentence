/*
* @Author: Ryan Choi
* @Date:   2018-04-15 19:53:01
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-06-16 16:14:44
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
        };
    }

    componentDidMount() {
        this.displayLikeVote('likeVote');
    }

    displayLikeVote = async (key) => {
        let likeVote;
        try {
            likeVote = +(await AsyncStorage.getItem(key));
            console.log("Ryan likeVote => ", likeVote);
        } catch (error) {
            console.log(error);
        }

        this.setState({ likeVote });
    }

    updateLikeVote = async (key) => {
        let oldLikeVote;
        try {
            oldLikeVote = +(await AsyncStorage.getItem(key));
        } catch (error) {
            console.log(error);
        }

        if (key === 'likeVote') {
            const likeVote = (oldLikeVote || +(this.state.likeVote)) + 1;

            AsyncStorage.setItem('likeVote', likeVote.toString());
            this.setState({ likeVote });
        }
    }

    render() {
        return (
            <View style={styles.voteContainer}>
                <TouchableOpacity onPress={() => this.updateLikeVote('likeVote')}>
                    <Image
                        source={require('../../assets/images/icons8-thumbs-up-50.png')}
                        style={this.like}
                    />
                </TouchableOpacity>
                <Text>"like: " {this.state.likeVote}</Text>
            </View>
        );
    }
}

Voting.propTypes = {
    likeVote: propTypes.number,
};

Voting.defaultProps = {
    likeVote: 0,
};

const styles = StyleSheet.create({
    voteContainer: {
        flexDirection: 'row',
        justifyContent: 'center',

    },

    likeDown: {

    },

    like: {

    },
});

export default Voting;