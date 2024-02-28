import React from 'react';
import './CSS/BuySell.css'
import PropTypes from 'prop-types';

export default function BuySell({ticker ,api,setRender,render}) {

    async function BuyClick(){
        
            try {
                const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${api}`)
                if(!response.ok){
                    throw new Error()
                }
                const data = await response.json();
                if(data.c === 0){
                    alert('cant buy not a ticker')
                    throw new Error()
                } 
                const res = await fetch('http://localhost:3000/api',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: 1,
                        ticker,
                        price: data.c
                    })
                });
                if(!res.ok){
                    throw new Error()
                }
                setRender(!render)

          } catch (error) {
              console.error('Error fetching data:', error);
              // Handle error
          }
          

    }
    const SellClick = async ()=>{
        try {
            const response = await fetch(`http://localhost:3000/api/${ticker}`,{
                method: 'DELETE'
            })
            if(!response.ok){
                throw new Error(response.status)
            }
            setRender(!render)
        } catch (error) {
            console.log(ticker)
            alert('Error: ' + error.message + ' could not delete')
        }
    }

  return (
    <div id='buy-sell'>
        <button onClick={BuyClick}>
            BUY {ticker}
        </button>
        <button onClick={SellClick}>
            SELL {ticker}
        </button>
    </div>
  )
}
BuySell.propTypes ={
    ticker: PropTypes.string,
    api: PropTypes.string,
    setRender: PropTypes.func,
    render: PropTypes.bool
}