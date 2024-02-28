import React, { useState } from 'react'
import './CSS/Login.css'

export default function Login({setLoggedin}) {
    const [userName ,setUserName] = useState();
    const [password, setPassword] = useState();


 const onChangeU = e =>{
    setUserName(e.target.value);

 }
 const onChangeP = e =>{
    setPassword(e.target.value);

 }
 const onSubmit = async e =>{
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/api/login',{
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: userName,
                password: password
        })})
        console.log(response.ok)
        if(!response.ok){
            throw new Error();
        }
        const data = await response.json()
        console.log(data)
        setLoggedin(true)
    } catch (error) {
        alert('not a valid login')
        setLoggedin(false);
    }
    
 }

  return (
    
        <form id ='login-form' onSubmit={onSubmit}>
            <div>
                <label >Usename: <input type="text" value={userName} onChange={onChangeU}/></label>
            </div>
            <div>
                <label>Password: <input type="text" value={password} onChange={onChangeP}/></label>
            </div>
                <button > Login </button>
        </form>
  )
}
