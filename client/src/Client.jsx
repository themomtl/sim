import {useState } from 'react'
import StockOwned from './StockOwned'

import PropTypes from 'prop-types';
import StockInfoContainer from './StockInfoContainer';
import Dashboard from './Dashboard';

export default function Client({ticker}) {
  const [render,setRender] = useState()
  const api = 'c6s0ql2ad3ifcngb8qvg'
  return (
    <>
      <Dashboard render={render} setRender={setRender}/>
      <StockInfoContainer  ticker={ticker} setRender={setRender} render={render} api={api}/>
      <StockOwned render={render} setRender={setRender}/>
    </>
  )
}
Client.propTypes ={
  ticker: PropTypes.string
}