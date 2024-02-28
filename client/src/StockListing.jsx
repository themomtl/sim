import React from 'react'
import PropTypes from 'prop-types'

export default function StockListing({stock, render ,setRender}) {

    async function sell(){
        
        try {
            const response = await fetch(`http://localhost:3000/api/${stock.ticker}`,{
                headers: {'Content-type': 'application/json'},
                method: 'DELETE'
            })
            if(!response.ok){
                throw new Error(response.status)
            }
            setRender(!render)
        } catch (error) {
            console.log(stock.ticker)
            alert('Error: ' + error.message + ' could not delete')
        }
    }
  return (
    <div className='listing'>
        <div>{stock.ticker}</div>
        <div>${stock.avg}</div>
        <div>{stock.count}</div>
        <button onClick={sell}>SELL</button>
    </div>
  )
}
StockListing.propTypes ={
    stock: PropTypes.object,
    render: PropTypes.bool,
    setRender: PropTypes.func
  }
