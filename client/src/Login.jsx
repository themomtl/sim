import React, { useState } from 'react'
import './CSS/Login.css'

export default function Login({setUser}) {
    const [userName ,setUserName] = useState('');
    const [password, setPassword] = useState('');




 const onSubmit = async e =>{
    e.preventDefault();
    try {
        const response = await fetch('/api/users/login',{
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username: userName,
                password: password
        })})
        console.log(response.ok)
        if(!response.ok){
            throw new Error();
        }
        //const data = await response.json()
        //console.log(data)
        setUser(userName)
    } catch (error) {
        alert('not a valid login')
    }
    
 }
 const onclick = async (e) =>{
    e.preventDefault();
    try {
        const response = await fetch('/api/users/register',{
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username: userName,
                password: password
        })})
        console.log(response.ok)
        if(!response.ok){
            throw new Error();
        }
        setUser(userName)
    } catch (error) {
        alert('not a valid login')
    }
    
 }

  return (
    
        <form id ='login-form' onSubmit={onSubmit}>
            <div>
                <label >Usename: <input type="text" required  value={userName} onChange={e => setUserName(e.target.value)}/></label>
            </div>
            <div>
                <label>Password: <input type="password" required  value={password} onChange={e => setPassword(e.target.value)} /></label>
            </div>
                <button > Login </button>
                <button type='button' onClick={onclick}> Register </button>
        </form>
  )
}
