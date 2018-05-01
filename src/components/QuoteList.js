/*
* @Author: Ryan Choi
* @Date:   2018-05-01 11:37:16
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-01 14:27:25
*/
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

class QuoteList extends React.Component {
    static propTypes = {
        quotes: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);
    }

    render() {
        // console.log("Ryan this.props.quotes => ", this.props.quotes);
        return (
            <View style={styles.list}>
                {
                    this.props.quotes.map((quote) =>
                        <Text key={quote._id}>{quote.sentence}</Text>
                    )
                }
            </View>
        );
    }
}

// ...
const styles = StyleSheet.create({
    list: {
        backgroundColor: "#eee",
        flex: 1,
        width: '100%',
        paddingTop: 50,

    }
});

export default QuoteList;
