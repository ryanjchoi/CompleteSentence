/*
* @Author: Ryan Choi
* @Date:   2018-05-01 10:59:20
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-03 07:02:48
*/

const apiHost = 'http://localhost:3000/api/v1/quotes'

export default {
    async fetchInitialQuotes() {
        try {
            const response = await fetch(apiHost);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    },

    async fetchQuoteDetail(quoteId) {
        try {
            const uri = apiHost + '/id/' + quoteId;
            const response = await fetch(apiHost + '/id/' + quoteId);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }
};