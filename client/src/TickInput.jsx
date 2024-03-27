import {useState } from 'react'
import PropTypes from 'prop-types';
import Header from './Header';
import './CSS/TickInput.css'

export default function TickInput({setTicker,user, setUser}) {
    const  [input, setInput] = useState()
    
    const onSubmit = (e)=>{
      e.preventDefault();
      setTicker(input?.toUpperCase());
      setInput("");
    }
    const onLogout = ()=>{
      setUser('')
      setTicker('')
    }

  return (
    <div id='head'>
      <Header/>
    <form onSubmit={onSubmit}>
        <input type="text" value={input} onChange={e=>{setInput(e.target.value);}}/> 
    </form>
      <div>Welcom, {user}</div>
      <button onClick={onLogout}>Logout</button>
    </div>
  )
}

TickInput.propTypes ={
  setTicker: PropTypes.func
}