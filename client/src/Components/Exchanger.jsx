import React, { useState, useMemo } from 'react';
import MySelect from './UI/Select/MySelect';
import MyInput from './UI/Input/MyInput';
import MyButton from './UI/Button/MyButton';
import classes from '../Styles/Exchanger.module.css'

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
        leftValue: 0,
        rightValue: 0
    })
    useMemo(() => {
        if(activeInput.leftInputActive && currency.from && currency.to){
            return setState({...state, rightValue: (state.leftValue * currencyList[currency.from]  / currencyList[currency.to]).toFixed(4)})
        }else {
            return
        }
    }, [currency, state.leftValue])

    useMemo(() => {
        if(activeInput.rightInputActive && currency.from && currency.to){
            return setState({...state, leftValue: (currencyList[currency.to] * state.rightValue  / currencyList[currency.from]).toFixed(4)})
        }
        else {
            return
        }
    }, [currency, state.rightValue])

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
                  currencyList={currencyList}
                  value={currency.from ? currency.from :  'Select a currency'}
                  onChange={(e) => setCurrency({...currency, from: e.target.value})}
                  />
                </div>
                <MyInput 
                onClick={() => setActiveInput({...activeInput, rightInputActive: false, leftInputActive: true})}
                value={state.leftValue}
                onChange={e => setState({...state, leftValue: /[a-z]/.test(e.target.value) ? 0 : e.target.value})}
                />
                <MyButton onClick={swapCurrencies}>SWAP</MyButton>
              </div>
              <div className={classes.RightBlock}>
                <div className={classes.SelectBlock}>
                  <span>To</span>
                  <MySelect
                  currencyList={currencyList}
                  value={currency.to ? currency.to :  'Select a currency'}  
                  onChange={(e) => setCurrency({...currency, to: e.target.value})}
                  />
                </div>
                <MyInput
                onClick={() => setActiveInput({...activeInput, rightInputActive: true, leftInputActive: false})}
                value={state.rightValue}
                onChange={e => setState({...state, rightValue: /[a-z]/.test(e.target.value) ? 0 : e.target.value})}
                />
                <div className={classes.InfoBlock}>
                    <div className={classes.InfoBlock_CurrentRate}>
                        <span>Current Rate</span>
                        <span>{currency.from && currency.to && (currencyList[currency.from] / currencyList[currency.to]).toFixed(4)}</span>
                    </div>
                    <div>

                    </div>
                </div> 
              </div>
            </div>
      </div>
    )
}
export default Exchanger;