/*
* @Author: Ryan Choi
* @Date:   2018-05-01 10:38:54
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-06-03 17:45:53
* @Project Name: Cage the phrase
*/

import React from 'react';
import propTypes from 'prop-types';
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
            quote: null,
        };
    }

    async componentDidMount() {
        const quotes = await ajax.fetchQuotes();
        this.setState({ quotes });
    }

    setQuote = (quote) => {
        this.setState({ quote });
    }

    getQuote = () => this.state.quotes.find(
        (quote) => {
            if (quote._id === this.state.quote._id) {
                return quote;
            }
        }
    )

    searchQuotes = async (searchTerm) => {
        let quotes = [];
        if (searchTerm) {
            quotes = await ajax.fetchQuotes(searchTerm);
        }
        if (quotes.length === 0) return;
        //TODO: add message for no quote returning from the search term.
        this.setState({ quotes });
    }

    unSetQuote = () => {
        this.setState({
            quote: null,
        });
    }

    render() {
        if (!! this.state.quote) {
            return (
                <View style={styles.main}>
                    <QuoteDetail
                        quotes={this.state.quotes}
                        currentQuote={this.getQuote()}
                        onBack={this.unSetQuote}
                    />
                </View>
            );
        }

        const { quotes } = this.state;
        if (quotes.length > 0) {
            return (
                <View style={styles.main}>
                    <SearchBar onSearch={this.searchQuotes} />
                    <QuoteList
                        quotes={quotes}
                        onItemPress={this.setQuote}
                    />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Cage The Phrase</Text>
            </View>
        );
    }
}

App.propTypes = {
    quotes: propTypes.array.isRequired,
    quote: propTypes.object.isRequired,
};

App.defaultProps = {
    quotes: [],
    quote: {},
};

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
