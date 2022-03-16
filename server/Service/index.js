const axios = require('axios');
const fetching = require('../Utils/fetching');

let date = new Date();
date.setDate(date.getDate()-1);
let YY = date.getFullYear();
let MM = date.getMonth() + 1;
let DD = date.getDate();
class Service {
    async getTodayData () {
        try {
            let url = 'https://www.nbrb.by/api/exrates/rates?periodicity=0'
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }
    async getPrevData () {
        try {
            let url = `https://www.nbrb.by/api/exrates/rates?ondate=` + YY + `-` + MM + `-` + DD + `&periodicity=0`
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            throw new Error(error.message)
        }
    }
    async getDynamicData (arr) {
        let date = new Date();
        let MM = +date.getMonth() + 1;
        let d = new Date();
        d.setMonth(d.getMonth() + 1);

        const results = await Promise.all(arr.map(elem=>fetching(elem, d, date, MM)))
        return results
    }
}

module.exports =  new Service()