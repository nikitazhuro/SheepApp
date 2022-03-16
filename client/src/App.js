import React, { useEffect, useState, useMemo } from 'react'
import Exchange from './Components/Exchanger'
import classes from './Styles/App.module.css';
import { getCurrencyData } from './API/dataParse';
import MyLoader from './Components/UI/Loader/MyLoader';
import calculateTodayCurrency from './utils/calculateTodayCurrency';
import calculatePrevCurrency from './utils/calculatePrevCurrency';
import calculateDiagramData from './utils/calculateDinamicData';


function App() {
  const [isLoading, setIsLoading] = useState(true);

  const currencyList = useMemo(() => {
    return []
  }, []);

  useEffect( async () => {
    try {
      await getCurrencyData().then((data) => {
        calculateTodayCurrency(data, currencyList);
        return data
      }).then((data) => {
        calculatePrevCurrency(data, currencyList);
        return data
      }).then((data) => {
        calculateDiagramData(data, currencyList)
      })
      .finally(() => setIsLoading(false))
    } catch (error) {
      console.log(error)
    }
  }, [])

  if(isLoading){
    return <MyLoader/>
  }
  return (
    <div className={classes.App}>
      <Exchange currencyList={currencyList}/>
    </div>
  );
}

export default App;
