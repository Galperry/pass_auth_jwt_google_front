import axios from 'axios'
import React, {useRef, useState} from 'react'
import {Link} from 'react-router-dom'


export default function AddEmployee(props) {
    let Authorization = `bearer ${JSON.parse(localStorage.getItem("token"))}`
    const [error, setError] = useState("")
    const imgRef = useRef(null)
    const fnameRef = useRef(null)
    const lnameRef = useRef(null)
    const titleRef = useRef(null)

    async function submitAdd(e){
        e.preventDefault()


        var formData = new FormData();
        var imagefile = imgRef.current.files[0]
        formData.append("yourImage", imagefile);
        formData.append("FirstName", fnameRef.current.value)
        formData.append("LastName", lnameRef.current.value)
        formData.append("Title", titleRef.current.value)

        axios.post(`http://localhost:5000/api/employees`, formData, {headers:{Authorization,'Content-Type': 'multipart/form-data'
        }}).then(
            response => {
                if (response.data.error){
                    setError(response.data.message)
                }
                else{
                    alert(response.data.message)
                    props.history.push("/")
                }
            }
        )
    }
    return (
        <div className="container">
            <h1>Add new Employee</h1>
            <div className={`${error? "":"d-none"} alert alert-danger`}>{error}</div>
            <form onSubmit={(e)=>submitAdd(e)} >
                <div className="form-horizontal">
                    <div className="form-group row">
                        <label className="col-form-label col-sm-2" htmlFor="Title">Title</label>
                        <div className="col-sm-8">
                            <input ref={titleRef} autoFocus className="form-control" name="Title" defaultValue="" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-form-label col-sm-2" htmlFor="FirstName">FirstName</label>
                        <div className="col-sm-8">
                            <input ref={fnameRef} className="form-control" name="FirstName" defaultValue="" />
                        </div>
                    </div>


                    <div className="form-group row">
                        <label className="col-form-label col-sm-2" htmlFor="LastName">LastName</label>
                        <div className="col-sm-8">
                            <input ref={lnameRef} className="form-control" name="LastName" defaultValue="" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-form-label col-sm-2" htmlFor="img">Your image</label>
                        <div className="col-sm-8">
                            <input type="file" ref={imgRef} className="form-control" name="yourImage" defaultValue="" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-form-label col-sm-2"></label>
                        <div className="col-sm-10">
                            <input type="submit" value="Save" className="btn btn-default btn-success" />
                            <Link className="btn btn-outline-dark cancel" to="/">Cancel</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
