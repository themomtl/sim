import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CSS/StockPrice.css';
export default function StockPrice({ticker}) {
  const [stockData,setStockData] = useState();
  const [refresh,setRefresh] = useState(false);
  useEffect(()=>{
    (async()=>{
      if(ticker){
        try {
          const response = await fetch(`/api/stockInfo/${ticker}`)
          if(!response){
              throw new Error()
          }
          const data = await response.json();
          console.log(data)
          setStockData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error
        }
      }
    })();
  },[ticker,refresh])
  const dataRefresh = () => {
    setRefresh(!refresh);
  }
  return (
    <div id='price'>
      <div id='stock-name'>
        {stockData?.name}
      </div>
      <div id='stock-price'>
        ${stockData?.c}
      </div>
      <div>
        Change: {stockData?.d}
      </div>
      <div>
        DayHigh: {stockData?.h}
      </div>
      <div>
        DayLow: {stockData?.l}
      </div>
      <div>
        OpenPrice: {stockData?.o}
      </div>
      <div>
        PreviousClose: {stockData?.pc}
      </div>
      <button onClick={dataRefresh}>Refresh</button>
    </div>
  )
}

StockPrice.propTypes ={
  ticker: PropTypes.string,
  api: PropTypes.string
};


