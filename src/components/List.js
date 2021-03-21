import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default function List() {
    const [list, setList]= useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:5000/api/employees").then((response)=>{
            setList(response.data.recordset)
        })
   
    }, [message])

    function submitDelete(id){
        axios.delete(`http://localhost:5000/api/employees/${id}`).then((response)=>{
            setMessage(response.data.message)
            setTimeout(() => {
                setMessage("")
            }, 3000);
        })
    }
    console.log(list)
    return (
        <div className="container">
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
                        <tr>
                            <td scope="row">{employee.EmployeeID}</td>
                            <td><img src={`http://localhost:5000/${employee.PhotoPath}`}
                                alt={ employee.FirstName } /></td>
                            <td>{ employee.FirstName }</td>
                            <td>{ employee.LastName }</td>
                            <td>{ employee.Title }</td>
                            <td className="d-print-none">
                                <Link to={`/employee/${employee.EmployeeID}`} className="btn btn-sm btn-warning">
                                    Edit
                                </Link>
                                <button className="btn btn-sm btn-danger delete-button" onClick={()=>submitDelete(employee.EmployeeID)} >Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            }
        </div>
    )
}
