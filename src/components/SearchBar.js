/*
* @Author: Ryan Choi
* @Date:   2018-05-05 06:44:43
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-09 18:57:21
*/
import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import { TextInput, StyleSheet } from 'react-native';

export default class SearchBar extends React.Component {
    static propTypes = {
        searchQuotes: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
        }
    }

    debouncedSearchQuotes = debounce(this.props.searchQuotes, 300);

    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, () => {
            this.debouncedSearchQuotes(this.state.searchTerm);
        });
    }

    render() {
        return (
            <TextInput
                placeholder="Search All Quotes"
                style={styles.input}
                onChangeText={this.handleChange}
            />
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginHorizontal: 12,
    },
});
