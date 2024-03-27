import { useState } from 'react'
import './CSS/App.css'
import Header from './Header'
import Client from './Client'
import TickInput from './TickInput'
import Login from './Login'

function App() {
  const [ticker, setTicker] = useState()
  const [user,setUser] = useState(false)
  return (
    <>
      {!user ? <Login setUser={setUser}/> : 
      <>
        <TickInput setTicker={setTicker} user={user} setUser={setUser}/>
        <Client ticker={ticker}/>
      </>}
    </>
  )
}

export default App
