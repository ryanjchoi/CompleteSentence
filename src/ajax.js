/*
* @Author: Ryan Choi
* @Date:   2018-05-01 10:59:20
* @Last Modified by:   Ryan Choi
* @Last Modified time: 2018-05-01 11:27:51
*/
// const apiHost = 'https://bakesaleforgood.com'
const apiHost = 'http://localhost:3000'

export default {
    async fetchInitialDeals() {
        try {
            // let response = await fetch(apiHost + '/api/deals');
            let response = await fetch(apiHost + '/api/v1/quotes');
            let responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }
};