import React, {useMemo} from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const Chart = ({currencyList, currency}) => {

  
  const lineChartData = useMemo(() => {
    let dateArr = [];
    let leftPart = [];
    let rightPart = [];
    if(currency.from){
      currencyList[2][currency.from].map((elem) => {
        dateArr.push(elem.Date.split('T')[0])
        currencyList[2][currency.from].map((elem) => {
          console.log(elem.Cur_OfficialRate)
        })
      })
    }
    if(currency.to){
      currencyList[2][currency.to].map((elem) => {
        rightPart.push(elem.Cur_OfficialRate)
      })
    }
    if(currency.from && currency.to){
      
    }

    return {
      labels: dateArr,
      datasets: [
        {
          data: [8137119, 9431691, 10266674],
        },
      ]
    };
  }, [currencyList, currency])

  return (
    <Line
      type="line"
      width={160}
      height={60}
      data={lineChartData}
    />
  );
};
export default Chart;