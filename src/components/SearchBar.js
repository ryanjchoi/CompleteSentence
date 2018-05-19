/*
* @Author: Ryan Choi
* @Date:   2018-05-05 06:44:43
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-19 16:34:23
*/
import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import { TextInput, StyleSheet } from 'react-native';

export default class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
        };
    }

    debouncedSearchQuotes = debounce(this.props.onSearch, 300);

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

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginHorizontal: 12,
    },
});
