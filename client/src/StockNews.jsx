import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import './CSS/StockNews.css'

export default function StockNews({ticker,api}) {
  const [news, setNews] = useState([]);

  const date = new Date().toLocaleDateString()
  useEffect(()=>{
    (async()=>{
      try {
        const response = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${date}&to=${date}&token=${api}`)
        if(!response){
            throw new Error()
        }
        const data = await response.json();
        console.log(data)
        setNews(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error
    }
    })();
  },[ticker,api])

  return (
    <div id='news' >{news?.length ? news?.map(n=><div>{n?.headline}</div>):'NO NEWS'}</div>
  )
}
StockNews.propTypes ={
  ticker: PropTypes.string,
  api: PropTypes.string
};


