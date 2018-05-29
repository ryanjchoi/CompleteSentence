/*
* @Author: Ryan Choi
* @Date:   2018-05-01 11:37:16
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-29 07:03:43
*/
import React from 'react';
import propTypes from 'prop-types';
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

QuoteList.propTypes = {
    quotes: propTypes.array.isRequired,
    onItemPress: propTypes.func.isRequired,
};

QuoteList.defaultProps = {
    quotes: [],
};

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#eee',
        flex: 1,
        width: '100%',
        // paddingTop: 50,

    }
});

export default QuoteList;
