import  { useEffect, useState } from 'react'
import './CSS/DashBoard.css'
export default function Dashboard({render,setRender}) {
    const [cost ,setCost] = useState(0);
    const [balance, setBalance] = useState(0);
useEffect(() => {
    (async()=>{
        try {
            const response = await fetch('http://localhost:3000/api/total')
            if(!response.ok){
                throw new Error();
            }
            const data = await response.json();
            setCost(data)
        } catch (error) {
            console.log(error);
        }
    })();
    (async()=>{
        try {
            const response = await fetch('http://localhost:3000/api/total-now')
            if(!response.ok){
                throw new Error();
            }
            const data = await response.json();
            setBalance(data)
        } catch (error) {
            console.log(error);
        }
    })()
},[render])


  return (
    <div id='dash'>
        <div>Account Cost  -  ${Math.round(cost[0]?.sum * 100) / 100}</div>
        <div>Total Balance -   ${balance?.sum}</div>
        <div>Gains/Losses - ${Math.round(balance?.sum *100 - cost[0]?.sum * 100) / 100}</div>
        <div>{Math.round(balance?.sum *100 - cost[0]?.sum * 100) / 100}%</div>
    </div>
    
  )
}
