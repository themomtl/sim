import {useState } from 'react'
import PropTypes from 'prop-types';
import Header from './Header';

export default function TickInput({setTicker}) {
    const  [input, setInput] = useState()
    
    const onSubmit = (e)=>{
      e.preventDefault();
      setTicker(input?.toUpperCase());
      setInput("");
    }

  return (
    <div id='head'>
      <Header/>
    <form onSubmit={onSubmit}>
        <input type="text" value={input} onChange={e=>{setInput(e.target.value);}}/> 
    </form>
    
    </div>
  )
}

TickInput.propTypes ={
  setTicker: PropTypes.func
}