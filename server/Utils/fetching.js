const fetch = require('node-fetch')

module.exports = function fetching(elem) {
  let date = new Date();
  let MM = +date.getMonth() + 1;
  let d = new Date();
  d.setMonth(d.getMonth() + 1);

  let url = `https://www.nbrb.by/API/ExRates/Rates/Dynamics/` + elem + `?startDate=` + d.getFullYear() + `-` + d.getMonth()
     + `-1&endDate=` + date.getFullYear() + `-` + MM + `-` + date.getDate();

    return fetch(url, {method: 'GET'}).then(response => {
      return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
      });
    });
}