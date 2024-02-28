import React, { useEffect, useState } from 'react'
import './CSS/StockOwned.css'
import StockListing from './StockListing';
import PropTypes from 'prop-types'

export default function StockOwned({render,setRender}) {
  const [stocks,setStocks] = useState()

  useEffect(()=>{
    (async()=>{
      try {
    
        const res = await fetch('http://localhost:3000/api')
        if(!res.ok){
            throw new Error()
        }
        const data = await res.json();
        console.log(data)
        setStocks(data);

  } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error
  }
    })();
  },[render])


  
  return (
    <div id='stock-list'>
      {stocks?.map(stock => <StockListing key={stock.id} stock={stock} render={render} setRender={setRender}/>)}
    </div>
  )
}
StockOwned.propTypes ={
  render: PropTypes.bool,
  setRender: PropTypes.func
}

