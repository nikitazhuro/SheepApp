import React, { useState, useMemo } from 'react';
import MySelect from './UI/Select/MySelect';
import MyInput from './UI/Input/MyInput';
import MyButton from './UI/Button/MyButton';
import classes from '../Styles/Exchanger.module.css'
import { useTodayChange } from '../Hooks/useTodayChange';
import Chart from './Diagram';


const Exchanger = ({currencyList}) => {
    const [currency, setCurrency] = useState({
        from: '',
        to: ''
    });
    const [activeInput, setActiveInput] = useState({
        leftInputActive: false,
        rightInputActive: false
    })
    const [state, setState] = useState({
        leftValue: '',
        rightValue: ''
    })
    useMemo(() => {
        let currentValue = (state.leftValue * currencyList[0][currency.from]  / currencyList[0][currency.to]).toFixed(4);

        if(activeInput.leftInputActive && currency.from && currency.to){
            return setState({...state, rightValue: currentValue})
        }else {
            return
        }
    }, [currency, state.leftValue])

    useMemo(() => {
        let currentValue = (currencyList[0][currency.to] * state.rightValue  / currencyList[0][currency.from]).toFixed(4);

        if(activeInput.rightInputActive && currency.from && currency.to){
            return setState({...state, leftValue: currentValue})
        }
        else {
            return
        }
    }, [currency, state.rightValue])

    const {changePersent, changeValue} = useTodayChange(currencyList, currency);

    const swapCurrencies = () => {
        let currencyFrom = currency.from;
        setCurrency({...currency, from: currency.to, to: currencyFrom})
    }
    return (
        <div className={classes.Exchanger}>
            <h1>Exchange money</h1>
            <div className={classes.MainBlock}>
              <div className={classes.LeftBlock}>
                <div className={classes.SelectBlock}>
                  <span>From</span>
                  <MySelect
                  currencyList={currencyList[0]}
                  value={currency.from ? currency.from :  'Select a currency'}
                  onChange={(e) => setCurrency({...currency, from: e.target.value})}
                  />
                </div>
                <MyInput 
                onClick={() => setActiveInput({...activeInput, rightInputActive: false, leftInputActive: true})}
                value={state.leftValue}
                onChange={e => setState({...state, leftValue: /[^.0-9]+/iu.test(e.target.value) ? state.leftValue : e.target.value})}
                />
              </div>
              <div className={classes.RightBlock}>
                <div className={classes.SelectBlock}>
                  <span>To</span>
                  <MySelect
                  currencyList={currencyList[0]}
                  value={currency.to ? currency.to :  'Select a currency'}  
                  onChange={(e) => setCurrency({...currency, to: e.target.value})}
                  />
                </div>
                <MyInput
                onClick={() => setActiveInput({...activeInput, rightInputActive: true, leftInputActive: false})}
                value={state.rightValue}
                onChange={e => setState({...state, rightValue: /[^.0-9]+/iu.test(e.target.value) ? state.leftValue : e.target.value})}
                />
              </div>
            </div>
            <div className={classes.SwapAndState}>
                <div className={classes.btnSwap}>
                    <MyButton onClick={swapCurrencies}>SWAP</MyButton>
                </div>
                <div className={classes.InfoBlock}>
                        <div className={classes.InfoBlock_CurrentRate}>
                            <span style={{opacity: '0.5'}}>Current Rate</span>
                            <span>{currency.from && currency.to && (currencyList[0][currency.from] / currencyList[0][currency.to]).toFixed(4)}</span>
                        </div>
                        <div className={classes.InfoBlock_TodayChange}>
                            <span style={{opacity: '0.5'}}>Today's change</span>
                            <span style={changeValue >=0 ? {color: 'green'} : {color: 'red'}}>
                                {currency.from && currency.to && changeValue >=0 && <span>&#9650;</span>}
                                {currency.from && currency.to && changeValue < 0 && <span>&#9660;</span>}
                                {currency.from && currency.to && changeValue}
                                {currency.from && currency.to && <span> ({changePersent}%)</span>}
                            </span>
                        </div>
                    </div> 
                </div>
            <div className={classes.Diagram}>
                {currency.from && currency.to && <Chart currencyList={currencyList} currency={currency}/>}
            </div>
            
      </div>
    )
}
export default Exchanger;