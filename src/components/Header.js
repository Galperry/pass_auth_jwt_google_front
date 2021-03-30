import React from 'react'
import {Link, useHistory} from 'react-router-dom'

export default function Header() {
    const history = useHistory()
    function logOut(){
        localStorage.removeItem("token")
        window.location.reload()
    }

    return (
        <ul>
            <Link to="/">Home</Link>
            <button onClick={()=>logOut()}>Log out</button>
        </ul>
    )
}
