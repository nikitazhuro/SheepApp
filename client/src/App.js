import React, { useEffect, useState, useMemo } from 'react'
import Exchange from './Components/Exchanger'
import classes from './Styles/App.module.css';
import { getCurrencyData } from './API/dataParse';
import MyLoader from './Components/UI/Loader/MyLoader';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const currencyList = useMemo(() => {
    return {
      BYN: 1,
      PLN: 0,
      USD: 0,
      GBP: 0,
      EUR: 0,
      UAH: 0,
      RUB: 0
    }
  }, [])
  console.log(123)

  useEffect( async () => {
    try {
      await getCurrencyData().then((data) => {
        data.forEach((elem) => {
          if(elem.Cur_Abbreviation in currencyList){
            if(elem.Cur_Abbreviation == 'PLN'){
              currencyList[elem.Cur_Abbreviation] = elem.Cur_OfficialRate / 10
            } else if(elem.Cur_Abbreviation == 'RUB' || elem.Cur_Abbreviation == 'UAH'){
              currencyList[elem.Cur_Abbreviation] = elem.Cur_OfficialRate / 100
            }else {
              currencyList[elem.Cur_Abbreviation] = elem.Cur_OfficialRate
            }
          }
        })    
      }).finally(() => setIsLoading(false))
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
