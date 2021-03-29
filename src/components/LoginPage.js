import axios from 'axios'
import React, {useRef} from 'react'
import {useHistory} from 'react-router-dom'

export default function LoginPage() {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const history = useHistory(null)

    const loginUser = ()=>{
        axios.post("/login", {username:usernameRef.current.value, password:passwordRef.current.value}).then(
            (response) =>{
                if (response.data.token){
                    localStorage.setItem("token",JSON.stringify(response.data.token))
                    history.push("/")
                }
                else{
                    console.log(response.data.message)
                }
            }
        )
    }

    const registerUser = ()=>{
        axios.post("/login/register", {username:usernameRef.current.value, password:passwordRef.current.value}).then(
            (response) =>{
                if (response.data.token){
                    localStorage.setItem("token",JSON.stringify(response.data.token))
                    history.push("/")
                }
                else{
                    console.log(response.data.message)
                }
            }
        )
    }

    const googleLogin = () =>{
        axios.get("http://localhost:5000/login/google").then((response)=>{
            console.log(response)
        })
    }
    return (
        <div>
            <label htmlFor="username">Username</label>
            <input ref={usernameRef} type="text" name="username" id="username"/>
            <label htmlFor="password">Password</label>
            <input ref={passwordRef} type="password" name="password" id="password"/>
            <br/>
            <button className="btn btn-primary" onClick={()=>{loginUser()}}>Log-in</button>
            <button className="btn btn-danger" onClick={()=>{googleLogin()}}>Log-in with Google</button>
            <button className="btn btn-primary" onClick={()=>{registerUser()}}>Register</button>
        </div>
    )
}
