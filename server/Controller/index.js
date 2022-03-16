const axios = require('axios');

let date = new Date();
date.setDate(date.getDate()-1);
let YY = date.getFullYear();
let MM = date.getMonth() + 1;
let DD = date.getDate();

const url = 'https://www.nbrb.by/api/exrates/rates?periodicity=0'
let prevDateUrl = `https://www.nbrb.by/api/exrates/rates?ondate=` + YY + `-` + MM + `-` + DD + `&periodicity=0`

class DataController {
    async getCurrencyData (req, res) {
        try {
            const response = await axios.get(url)
            const prevResponse = await axios.get(prevDateUrl)
            let groupData = {
                todayData: response.data,
                prevData: prevResponse.data
            }
            return res.json(groupData)
        } catch (error) {
            return res.status(400).json(`${error.message}`)
        }
    }
}

module.exports =  new DataController()