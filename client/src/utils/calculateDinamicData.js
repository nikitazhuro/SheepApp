export default function calculateDiagramData (data, currencyList) {
    let testObj = {}
      data.prevData.forEach((elem, index) => {
        let currencyName = elem.Cur_Abbreviation;
          if(data.dynamicData[index][0].Cur_ID == elem.Cur_ID){
              for (let key of Object.keys(data.dynamicData[index])){
                data.dynamicData[index][key].Cur_OfficialRate = data.dynamicData[index][key].Cur_OfficialRate / elem.Cur_Scale
              }
              testObj[currencyName] = data.dynamicData[index]
          }
      })
    return currencyList.push(testObj)
  }