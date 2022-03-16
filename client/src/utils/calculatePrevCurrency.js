export default function calculatePrevCurrency (data, currencyList) {
  let testObj = {}
    data.prevData.forEach((elem) => {
        let currencyName = elem.Cur_Abbreviation;
        let currencyValue = elem.Cur_OfficialRate;

        testObj[currencyName] = currencyValue / elem.Cur_Scale

    })
  return currencyList.push(testObj)
}