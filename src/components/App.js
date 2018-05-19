/*
* @Author: Ryan Choi
* @Date:   2018-05-01 10:38:54
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-19 12:31:01
*/

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ajax from '../ajax';
import QuoteList from './QuoteList';
import QuoteDetail from './QuoteDetail';
import SearchBar from './SearchBar';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            quotes: [],
            quoteId: null,
        };
    }

    async componentDidMount() {
        const quotes = await ajax.fetchQuotes();
        this.setState({ quotes });
    }

    setQuoteId = (quoteId) => {
        this.setState({
            quoteId: quoteId,
        });
    };

    unsetQuoteId = () => {
        this.setState({
            quoteId: null,
        });
    };

    searchQuotes = async (searchTerm) => {
        let quotes = [];
        if (searchTerm) {
            quotes = await ajax.fetchQuotes(searchTerm);
        }
        this.setState({ quotes });
    };

    getQuote = () => this.state.quotes.find(
        (quote) => quote._id === this.state.quoteId
    );

    render() {
        if (this.state.quoteId) {
            return (
                <View style={styles.main}>
                    <QuoteDetail
                        quotes={this.state.quotes}
                        currentQuote={this.getQuote()}
                        onBack={this.unsetQuoteId}
                    />
                </View>
            );
        }

        const quotesToDisplay = this.state.quotes;

        if (quotesToDisplay.length > 0) {
            return (
                <View style={styles.main}>
                    <SearchBar onSearch={this.searchQuotes} />
                    <QuoteList
                        quotes={quotesToDisplay}
                        onItemPress={this.setQuoteId}
                    />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Text style={styles.header}>CompleteSentence</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        flex: 1,
        marginTop: 30,
    },
    header: {
        fontSize: 40,
    },
});

export default App;
