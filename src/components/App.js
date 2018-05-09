/*
* @Author: Ryan Choi
* @Date:   2018-05-01 10:38:54
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-09 18:54:55
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
            quotesFormSearch: [],
            currentQuoteId: null,
        };
    }

    async componentDidMount() {
        const quotes = await ajax.fetchInitialQuotes();
        this.setState({ quotes });
    }

    setCurrentQuote = (quoteId) => {
        this.setState({
            currentQuoteId: quoteId,
        });
    };

    unsetCurrentQuote = () => {
        this.setState({
            currentQuoteId: null,
        });
    };

    searchQuotes = async (searchTerm) => {
        let quotesFormSearch = [];
        if (searchTerm) {
            quotesFormSearch = await ajax.fetchQuoteSearchResults(searchTerm);
        }
        this.setState({ quotesFormSearch });
    };

    currentQuote = () => this.state.quotes.find(
        (quote) => quote._id === this.state.currentQuoteId
    );

    render() {
        if (this.state.currentQuoteId) {
            return (
                <View style={styles.main}>
                    <QuoteDetail
                        initialQuoteData={this.currentQuote()}
                        onBack={this.unsetCurrentQuote}
                    />
                </View>
            );
        }
        if (this.state.quotes.length > 0) {
            return (
                <View style={styles.main}>
                    <SearchBar searchQuotes={this.searchQuotes} />
                    <QuoteList
                        quotes={this.state.quotes}
                        onItemPress={this.setCurrentQuote}
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

// App.propTypes = {
//     name: React.PropTypes.string,
// };

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
