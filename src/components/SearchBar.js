/*
* @Author: Ryan Choi
* @Date:   2018-05-05 06:44:43
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-06-03 17:29:23
*/
import React from 'react';
import propTypes from 'prop-types';
import debounce from 'lodash.debounce';

import { TextInput, StyleSheet, AsyncStorage } from 'react-native';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        // let searchTerm = this.getSearchTerm();
        this.state = {
            searchTerm: '',
        };
    }

    componentDidMount() {
        this.getSearchTerm();
    }

    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, () => {
            this.debouncedSearchQuotes(this.state.searchTerm);
        });

        this.saveSearchTerm(searchTerm);
    }

    saveSearchTerm = (searchTerm) => {
        AsyncStorage.setItem('searchTerm', searchTerm);
    }

    getSearchTerm = async () => {
        let searchTerm = '';
        try {
            searchTerm = await AsyncStorage.getItem('searchTerm');
        } catch (error) {
            console.log(error);
        }
        this.handleChange(searchTerm);
        this.setState({ searchTerm });
    }

    debouncedSearchQuotes = debounce(this.props.onSearch, 300);

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
    onSearch: propTypes.func.isRequired,
};

SearchBar.defaultProps = {

};

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginHorizontal: 12,
    },
});

export default SearchBar;
