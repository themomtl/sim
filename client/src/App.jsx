import { useState } from 'react'
import './CSS/App.css'
import Header from './Header'
import Client from './Client'
import TickInput from './TickInput'
import Login from './Login'

function App() {
  const [ticker, setTicker] = useState()
  const [loggedin,setLoggedin] = useState(false)

  console.log(loggedin)
  return (
    <>
      {loggedin ? 
      <div>
      <TickInput setTicker={setTicker}/>
      <Client ticker={ticker}/>
      </div> : <Login setLoggedin={setLoggedin}/>}
      
    </>
  )
}

export default App
