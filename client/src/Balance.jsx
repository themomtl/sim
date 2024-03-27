import{ useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import './CSS/Balance.css'

export default function Balance({render}) {
    const [balance, setBalance] = useState(0);
    const [refresh,setRefresh] = useState(false);
    useEffect(()=>{
        (async()=>{
            try {
                const response = await fetch('/api/users/account/balance',{credentials: 'include'})
                if(!response.ok){
                    throw new Error();
                }
                const data = await response.json();
                setBalance(data);
            } catch (error) {
                console.log(error);
            }
        })();
    },[render, refresh])

    const refreshClick = () => {
        setRefresh(!refresh);
    }
  return (
    <div id='balance' className='dash-div'>
        <div>Balance    ${Math.round(balance * 100) / 100}</div> 
        <button onClick={refreshClick}>Refresh</button>
    </div>
  )
}

Balance.propTypes ={
    render: PropTypes.func
  }
