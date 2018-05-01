/*
* @Author: Ryan Choi
* @Date:   2018-05-01 10:38:54
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-01 14:25:16
*/

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ajax from '../ajax';
import QuoteList from './QuoteList';

class App extends React.Component {

    state = {
        quotes: [],
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const quotes = await ajax.fetchInitialDeals();
        this.setState({ quotes });
        // console.log("Ryan quotes => ", quotes);
    }

    render() {
        console.log("Ryan this.state.quotes.length => ", this.state.quotes.length);
        return (
            <View style={styles.container}>
                {
                    this.state.quotes.length > 0 ? (
                        <QuoteList quotes={this.state.quotes} />
                    ) : (
                        <Text style={styles.header}>CompleteSentence</Text>
                    )
                }
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