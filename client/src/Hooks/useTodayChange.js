import React, { useMemo } from 'react';

export const useTodayChange = (currencyList, currency) => {

    const todayChange = useMemo(() => {
        let today = (currencyList[0][currency.from] / currencyList[0][currency.to]).toFixed(4)
        let yesterday = (currencyList[1][currency.from] / currencyList[1][currency.to]).toFixed(4)
        return (today / yesterday).toFixed(4)
    }, [currencyList, currency.from, currency.to])
    
    return todayChange
}