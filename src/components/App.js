/*
* @Author: Ryan Choi
* @Date:   2018-05-01 10:38:54
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-04 07:01:05
*/

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ajax from '../ajax';
import QuoteList from './QuoteList';
import QuoteDetail from './QuoteDetail';

class App extends React.Component {

    state = {
        quotes: [],
        currentQuoteId: null,
    };

    constructor(props) {
        super(props);
    };

    async componentDidMount() {
        const quotes = await ajax.fetchInitialQuotes();
        this.setState({ quotes });
    };

    unsetCurrentQuote = () => {
        this.setState({
            currentQuoteId: null,
        });
    };

    setCurrentQuote = (quoteId) => {
        this.setState({
            currentQuoteId: quoteId,
        });
    };

    currentQuote = () => {
        return this.state.quotes.find(
            (quote) => quote._id === this.state.currentQuoteId
        );
    };

    render() {
        if (this.state.currentQuoteId) {
            return (
                <QuoteDetail
                    initialQuoteData={this.currentQuote()}
                    onBack={this.unsetCurrentQuote}
                />
            )
        }
        if (this.state.quotes.length > 0) {
            return (
                <QuoteList
                    quotes = {this.state.quotes}
                    onItemPress = {this.setCurrentQuote}
                />
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.header}>CompleteSentence</Text>
            </View>
        );
    }
}

// App.propTypes = {
//     name: React.PropTypes.string,
// };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 40,
    },
});

export default App;