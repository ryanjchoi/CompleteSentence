/*
* @Author: Ryan Choi
* @Date:   2018-05-01 14:35:50
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-01 16:32:31
*/
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class QuoteDetail extends React.Component {
    static propTypes = {
        quote: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            quote: this.props.initialQuoteData,
        }
    }

    render() {
        const { quote } = this.state;
        return (
            <View style={styles.quote}>
                <Image style={styles.image}></Image>
                <View style={styles.info}>
                    <Text style={styles.sentence}>{quote.sentence}</Text>
                    <View style={styles.footer}>
                        <Text style={styles.author}>- {quote.author}</Text>
                        <Image style={styles.avata}></Image>
                    </View>
                </View>
                <Text>...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    quote: {
        marginHorizontal: 12,
        marginTop: 50,
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
        flex:2,
        fontSize: 16,
        marginBottom: 5,
    },
    avata: {
        width: 50,
        height: 50,
        backgroundColor: '#ccc',
    },

});
