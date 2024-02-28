import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CSS/StockPrice.css';
export default function StockPrice(props) {
  
  const {ticker,api} = props;

  const [stockData,setStockData] = useState();
  const [stockProfile,setStockProfile] = useState();
  
  useEffect(()=>{
    (async()=>{
      try {
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${api}`)
        if(!response){
            throw new Error()
        }
        const data = await response.json();
        setStockData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error
    }
    })();
    (async()=>{
      try {
        const response = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${api}`)
        if(!response){
            throw new Error()
        }
        const data = await response.json();
        setStockProfile(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error
    }
    })();
    console.log(ticker)
  },[ticker,api])
  return (
    <div id='price'>
      <div id='stock-name'>
        {stockProfile?.name}
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
      
    </div>
  )
}

StockPrice.propTypes ={
  ticker: PropTypes.string,
  api: PropTypes.string
};


