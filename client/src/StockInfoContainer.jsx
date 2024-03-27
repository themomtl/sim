import './CSS/StockInfoContainer.css';
import StockPrice from './StockPrice'
import StockNews from './StockNews'
import BuySell from './BuySell'
import PropTypes from 'prop-types';

export default function StockInfoContainer({ticker,api,render, setRender}) {
  return (
    <div id='stock-info'>
        <StockPrice ticker={ticker} api={api}/>
        <BuySell ticker={ticker} api={api}  setRender={setRender} render={render}/>
        <StockNews ticker={ticker} api={api}/>
    </div>
  )
}

StockInfoContainer.propTypes ={
    ticker: PropTypes.string,
    api: PropTypes.string,
    render: PropTypes.bool,
    setRender: PropTypes.func
}
