import axios from 'axios'
import React, {useRef, useEffect} from 'react'
import {useHistory} from 'react-router-dom'

export default function LoginPage(props) {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const history = useHistory(null)

    useEffect(() => {
        if (props.match.params.token){
            localStorage.setItem("token",JSON.stringify(props.match.params.token))
        }

    }, [props])

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
        window.location.href = "http://localhost:5000/login/google"
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
