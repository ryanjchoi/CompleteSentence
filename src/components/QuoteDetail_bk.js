/*
* @Author: Ryan Choi
* @Date:   2018-05-01 14:35:50
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-12 06:40:19
*/
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import ajax from '../ajax';

export default class QuoteDetail extends React.Component {
    static propTypes = {
        initialQuoteData: PropTypes.object.isRequired,
        onBack: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            quote: this.props.initialQuoteData,
        };
    }

    async componentDidMount() {
        const fullQuote = await ajax.fetchQuoteDetail(this.state.quote._id);
        console.log('Ryan fullQuote => ', fullQuote);
        this.setState({
            quote: fullQuote,
        });
    }

    render() {
        const { quote } = this.state;
        return (
            <View style={styles.quote}>
                <TouchableOpacity onPress={this.props.onBack}>
                    <Text style={styles.backlink}>Back</Text>
                </TouchableOpacity>
                <View style={styles.detail}>
                    <Image style={styles.image} />
                    <View style={styles.info}>
                        <Text style={styles.sentence}>{quote.sentence}</Text>
                        <View style={styles.footer}>
                            <Text style={styles.author}>- {quote.author}</Text>
                            <Image style={styles.avata} />
                        </View>
                    </View>
                    <Text>{quote._id}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    quote: {
        marginHorizontal: 12,
    },
    detail: {
        borderColor: '#bbb',
        borderWidth: 1,
    },
    backlink: {
        marginBottom: 5,
        color: '#22f',
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
        width: 60,
        height: 60,
        backgroundColor: '#ccc',
    },

});
