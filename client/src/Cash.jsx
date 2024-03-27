import{ useEffect, useState } from 'react'
import PropTypes from 'prop-types';


export default function Cash({render}) {
    const [cashHere, setCashHere] = useState(0);
    useEffect(()=>{
        (async()=>{
            try {
                const response = await fetch('/api/users/account',{credentials: 'include'})
                if(!response.ok){
                    throw new Error();
                }
                const data = await response.json();
                setCashHere(data);
                console.log(data)
            } catch (error) {
                console.log(error);
            }
        })();
    },[render])
  return (
    <div className='dash-div'>Cash${Math.round(cashHere * 100) / 100}</div>
  )
}

Cash.propTypes ={
    render: PropTypes.func,
    cash : PropTypes.object
  }
