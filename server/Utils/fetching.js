const fetch = require('node-fetch')

module.exports = function fetching(elem, d, date, MM) {
    let url = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/` + elem + `?startDate=` + d.getFullYear() + `-` + d.getMonth()
     + `-1&endDate=` + date.getFullYear() + `-` + MM + `-` + date.getDate();

    return fetch(url, {method: 'GET'}).then(response => {
      return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
      });
    });
}