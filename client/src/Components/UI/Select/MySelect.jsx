import React, { useMemo } from 'react';
import classes from './MySelect.module.css'

const MySelect = ({currencyList, ...props}) => {
    return (
        <select {...props} className={classes.MySelect}>
        <option selected value='Select a currency' disabled>Select a currency</option>
        {Array.from(Object.keys(currencyList)).map((elem) => 
            <option value={elem} key={elem}>{elem}</option>
        )}
        </select>
    )
}
export default MySelect;