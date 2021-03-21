import axios from 'axios'
import React, {useEffect, useState, useRef} from 'react'

export default function EmployeePage(props) {
    const [employee, setEmployee] = useState(null)
    const fnameRef = useRef(null)
    const lnameRef = useRef(null)
    const titleRef = useRef(null)
    useEffect(() => {
        axios.get(`http://localhost:5000/api/employees/${props.match.params.id}`).then((response)=>{
            setEmployee(response.data.employee)
        })
    
    }, [])
   
    function submitUpdate(e){
        e.preventDefault()
        axios.put(`http://localhost:5000/api/employees/${props.match.params.id}`,{FirstName:fnameRef.current.value, LastName:lnameRef.current.value, Title:titleRef.current.value}).then(
            response => {
                alert(response.data.message)
                props.history.push("/")
            }
        )
      
    }
   
    return (
        <div className="container">
            employee Page
            {employee &&
            <form onSubmit={(e)=>submitUpdate(e)}>
                
            <div className="form-horizontal">
                <div className="form-group row">
                    <label className="col-form-label col-sm-2" htmlFor="Title">Title</label>
                    <div className="col-sm-8">
                        <input ref={titleRef} autofocus className="form-control" name="Title" defaultValue={ employee.Title} />
                    </div>
                </div>
    
                <div className="form-group row">
                    <label className="col-form-label col-sm-2" htmlFor="FirstName">FirstName</label>
                    <div className="col-sm-7">
                        <input ref={fnameRef} className="form-control" name="FirstName" defaultValue={ employee.FirstName} />
                    </div>
                </div>
    
                <div className="form-group row">
                    <label className="col-form-label col-sm-2" htmlFor="LastName">LastName</label>
                    <div className="col-sm-7">
                        <input ref={lnameRef} className="form-control" name="LastName" defaultValue={ employee.LastName} />
                    </div>
                </div>
    
                <div className="form-group row">
                    <label className="col-form-label col-sm-2"></label>
                    <div className="col-sm-10">
                        <input type="submit" value="Save" className="btn btn-default btn-success" />
                        <a className="btn btn-outline-dark cancel" href="/employees">Cancel</a>
                    </div>
                </div>
    
            </div>
        </form>
            
            }

        </div>
    )
}
