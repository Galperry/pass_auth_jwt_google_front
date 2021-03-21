import axios from 'axios'
import React, {useRef} from 'react'

export default function AddEmployee(props) {
    const imgRef = useRef(null)
    const fnameRef = useRef(null)
    const lnameRef = useRef(null)
    const titleRef = useRef(null)

    function submitAdd(e){
        e.preventDefault()


        // var formData = new FormData();
        // var imagefile = imgRef.current.files[0]
        // formData.append("image", imagefile);
        // formData.append("FirstName", fnameRef.current.value)
        // formData.append("LastName", lnameRef.current.value)
        // formData.append("Title", titleRef.current.value)

        // axios.post(`http://localhost:5000/api/employees`, formData, {
        //     headers: {
        //     'Content-Type': 'multipart/form-data'
        //     }
        // })


        // console.log(imgRef.current.files[0])
        axios.post(`http://localhost:5000/api/employees`, {FirstName:fnameRef.current.value, LastName:lnameRef.current.value, Title:titleRef.current.value, imgPath:imgRef.current.files[0]}
        // , {
        //         headers: {
        //         'Content-Type': 'multipart/form-data'
        //         }
        //     }
            ).then(
            response => {
                alert(response.data.message)
                props.history.push("/")
            })
    }
    return (
        <div>
            <h1>Add Employee</h1>
            <form onSubmit={(e)=>submitAdd(e)} >
                <div class="form-horizontal">
                    <div class="form-group row">
                        <label class="col-form-label col-sm-2" for="Title">Title</label>
                        <div class="col-sm-8">
                            <input ref={titleRef} autofocus class="form-control" name="Title" defaultValue="" />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-form-label col-sm-2" for="FirstName">FirstName</label>
                        <div class="col-sm-7">
                            <input ref={fnameRef} class="form-control" name="FirstName" defaultValue="" />
                        </div>
                    </div>


                    <div class="form-group row">
                        <label class="col-form-label col-sm-2" for="LastName">LastName</label>
                        <div class="col-sm-7">
                            <input ref={lnameRef} class="form-control" name="LastName" defaultValue="" />
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-form-label col-sm-2" for="img">Your image</label>
                        <div class="col-sm-7">
                            <input type="file" ref={imgRef} class="form-control" name="img" defaultValue="" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-form-label col-sm-2"></label>
                        <div class="col-sm-10">
                            <input type="submit" value="Save" class="btn btn-default btn-success" />
                            <a class="btn btn-outline-dark cancel" href="/employees">Cancel</a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
