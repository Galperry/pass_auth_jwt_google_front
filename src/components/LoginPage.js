import axios from 'axios'
import React, {useRef, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import GoogleLogin from 'react-google-login';

export default function LoginPage(props) {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const history = useHistory(null)

    useEffect(() => {
        if (props.match.params.token){
            localStorage.setItem("token",JSON.stringify(props.match.params.token))
        }

    }, [props])
    const responseGoogle = (response) => {
        console.log(response);
      }

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
        // axios.get("http://localhost:5000/login/google").then((response)=>{
        //     console.log(response)
        // })
    }
    return (
        <div>
            <label htmlFor="username">Username</label>
            <input ref={usernameRef} type="text" name="username" id="username"/>
            <label htmlFor="password">Password</label>
            <input ref={passwordRef} type="password" name="password" id="password"/>
            <br/>
            <button className="btn btn-primary" onClick={()=>{loginUser()}}>Log-in</button>
            {/* <GoogleLogin
                clientId="823966840850-fii5u903q8bv5rtt0bpflq010aad9fog.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            /> */}
            <button className="btn btn-danger" onClick={()=>{googleLogin()}}>Log-in with Google</button>
            <button className="btn btn-primary" onClick={()=>{registerUser()}}>Register</button>
        </div>
    )
}
