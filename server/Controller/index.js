const axios = require('axios');

let date = new Date();
date.setDate(date.getDate()-1);
let YY = date.getFullYear();
let MM = date.getMonth();
let DD = date.getDate();

console.log(YY, MM, DD)
const url = 'https://www.nbrb.by/api/exrates/rates?periodicity=0'
let prevDateUrl = `https://www.nbrb.by/api/exrates/rates?ondate=2022-3-15&periodicity=1`

class DataController {
    async getCurrencyData (req, res) {
        try {
            const response = await axios.get(url)
            console.log(response.data)
            return res.json(response.data)
        } catch (error) {
            return res.status(400).json(`${error.message}`)
        }
    }
}

module.exports =  new DataController()