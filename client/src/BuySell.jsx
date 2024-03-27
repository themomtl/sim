import './CSS/BuySell.css'
import PropTypes from 'prop-types';

export default function BuySell({ticker,setRender,render,}) {

    async function BuyClick(){
        
            try {
                const res = await fetch('/api/users/account',{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ticker,
                    })
                });
                if(!res.ok){
                    throw new Error('not a good ticket')
                }          
                setRender(!render)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
    }

    const SellClick = async ()=>{
        try {
            const response = await fetch(`/api/users/account/sell/${ticker}`,{
                method: 'PUT',
                credentials: 'include'
            })
            if(!response.ok){
                throw new Error(response.status)
            }
            setRender(!render)
        } catch (error) {
            console.log(ticker)
            alert('Error: ' + error.message + ' could not sell')
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