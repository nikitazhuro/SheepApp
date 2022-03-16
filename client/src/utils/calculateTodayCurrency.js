export default function calculateTodayCurrency (data, currencyList) {
  let testObj = {}
    data.todayData.forEach((elem) => {
        let currencyName = elem.Cur_Abbreviation;
        let currencyValue = elem.Cur_OfficialRate;

        testObj[currencyName] = currencyValue / elem.Cur_Scale
    })
  return currencyList.push(testObj)
}