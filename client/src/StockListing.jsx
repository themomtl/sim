
import PropTypes from 'prop-types'

export default function StockListing({stock, render ,setRender}) {

    async function sell(){
        
      try {
        const response = await fetch(`/api/users/account/sell/${stock.ticker}`,{
            method: 'PUT',
            credentials: 'include'
        })
        if(!response.ok){
            throw new Error(response.status)
        }
        setRender(!render)
    } catch (error) {
        console.log(stock.ticker)
        alert('Error: ' + error.message + ' could not sell')
    }
    }
  return (
    <div className='listing'>
        <div>{stock.ticker}</div>
        <div>${stock.price}</div>
        <button onClick={sell}>SELL</button>
    </div>
  )
}
StockListing.propTypes ={
    stock: PropTypes.object,
    render: PropTypes.bool,
    setRender: PropTypes.func
  }
