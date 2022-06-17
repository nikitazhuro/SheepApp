const service = require('../Service/index');

class DataController {
  async getCurrencyData(req, res) {
    try {
      let arr = [];

      const getTodayData = await service.getTodayData();
      console.log(getTodayData);

      for (let i = 0; i < getTodayData.length; i++) {
        arr.push(getTodayData[i].Cur_ID)
      }

      const getPrevData = await service.getPrevData();
      const getDynamicData = await service.getDynamicData(arr);

      let groupData = {
        todayData: getTodayData,
        prevData: getPrevData,
        dynamicData: getDynamicData
      }
      return res.json(groupData)
    } catch (error) {
      return res.status(400).json(`${error.message}`)
    }
  }
}

module.exports = new DataController()