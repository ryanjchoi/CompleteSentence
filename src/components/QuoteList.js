/*
* @Author: Ryan Choi
* @Date:   2018-05-01 11:37:16
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-26 15:59:31
*/
import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';
import QuoteItem from './QuoteItem';

class QuoteList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.list}>
                <FlatList
                    data={this.props.quotes}
                    renderItem={
                        ({ item }) => <QuoteItem
                            quotes={this.props.quotes}
                            quote={item}
                            onPress={this.props.onItemPress}
                        />
                    }
                />
            </View>
        );
    }
}

QuoteList.PropTypes = {
    quotes: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
}

QuoteList.defaultProps = {
    quotes: [],
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        flex: 1,
        width: '100%',
        // paddingTop: 50,

    }
});

export default QuoteList;
