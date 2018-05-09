/*
* @Author: Ryan Choi
* @Date:   2018-05-01 14:35:50
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-09 19:00:53
*/
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default class QuoteItem extends React.Component {
    static propTypes = {
        quote: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    handlePress = () => {
        this.props.onPress(this.props.quote._id);
    }

    render() {
        const { quote } = this.props;
        return (
            <TouchableOpacity
                style={styles.quote}
                onPress={this.handlePress}
            >
                <Image style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.sentence}>{quote.sentence}</Text>
                    <View style={styles.footer}>
                        <Text style={styles.author}>- {quote.author}</Text>
                        <Image style={styles.avata} />
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    quote: {
        marginHorizontal: 12,
        marginTop: 12,
    },
    image: {
        width: '100%',
        height: 150,
        backgroundColor: '#ccc',
    },
    info: {
        padding: 10,
        backgroundColor: '#fff',
        borderColor: '#bbb',
        borderWidth: 1,
        borderTopWidth: 0,
    },
    sentence: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    footer: {
        flexDirection: 'row',
    },
    author: {
        flex: 2,
        fontSize: 16,
        marginBottom: 5,
    },
    avata: {
        width: 50,
        height: 50,
        backgroundColor: '#ccc',
    },

});
