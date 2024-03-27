import React, { useEffect, useState } from 'react'

export default function Gains({render}) {
    const [gains,setGains] = useState()
    useEffect(()=>{ (async ()=>{
        const response = await fetch('/api/users/account/gains',{credentials: 'include'})
        if(!response.ok){
            throw new Error();
        }
        const data = await response.json();
        setGains(data);
    })()
},[render])
  return (
    <div className='dash-div'>Gains ${Math.round(gains * 100) / 100}</div>
  )
}
