import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default function List() {
    let Authorization = `bearer ${JSON.parse(localStorage.getItem("token"))}`
    const [list, setList]= useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:5000/api/employees", {headers: {Authorization}}).then((response)=>{
            setList(response.data)
        })
   
    }, [message])

    function submitDelete(id){
        axios.delete(`http://localhost:5000/api/employees/${id}`, {headers: {Authorization}}).then((response)=>{
            setMessage(response.data.message)
            setTimeout(() => {
                setMessage("")
            }, 3000);
        })
    }
    return (
        <div className="container">
            <h1>Employees List</h1>
            <p>Welcome to Employees List</p>
            <div className={`alert alert-success ${message?"":"d-none"}`}>{message}</div>
            {list &&
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th >EmployeeID</th>
                        <th >Image</th>
                        <th >FirstName</th>
                        <th >LastName</th>
                        <th >Title</th>
                        <th className="d-print-none">
                            <Link className="btn btn-sm btn-success" to="/addemployee">
                                Add Employee
                            </Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((employee)=>
                        <tr key={employee._id}>
                            <td>{employee._id}</td>
                            <td><img width="120px" src={`http://localhost:5000/${employee.PhotoPath}`}
                                alt={ employee.FirstName } /></td>
                            <td>{ employee.FirstName }</td>
                            <td>{ employee.LastName }</td>
                            <td>{ employee.Title }</td>
                            <td className="d-print-none">
                                <Link to={`/employee/${employee._id}`} className="btn btn-sm btn-warning">
                                    Edit
                                </Link>
                                <button className="btn btn-sm btn-danger delete-button" onClick={()=>submitDelete(employee._id)} >Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            }
        </div>
    )
}
