/*
* @Author: Ryan Choi
* @Date:   2018-05-01 10:59:20
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-19 09:32:10
*/

const apiHost = 'http://localhost:3000/api/v1/quotes'

export default {
    async fetchQuoteDetail(quoteId) {
        try {
            const response = await fetch(apiHost + '/id/' + quoteId);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    },

    async fetchQuoteSearchResults(searchTerm) {
        const apiUrl = !searchTerm ? apiHost : apiHost + '/sentence/' + searchTerm;

        try {
            const response = await fetch(apiUrl);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }
};