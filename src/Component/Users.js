
import React, { useEffect, useRef }  from "react";
import AuthContext from "../context/auths/AuthContext";
import { useContext,useState } from "react";
import Rowitems from "./Rowitems";
import { useNavigate } from "react-router";
import swal from "sweetalert";

export default function Users() {
    const ref =useRef(null)
  const refclose =useRef(null)
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const {getalldata,allusers,edituser} = context;
  const [data, setdata] = useState({firstname : "",lastname :"",address:"", email:"", password: ""});
  useEffect(() => {
    if(localStorage.getItem('token')){
      getalldata();
    }
    else{
      navigate('/login')
    }
    }, []);
    
  // const alldata= allusers;

  const Update = (user) =>{
    setdata({id:user._id,firstname : user.firstname,lastname :user.lastname,address:user.address, email:user.email})
    ref.current.click();

  }
  const onchange =(e)=>{
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleclick =(e)=>{
    e.preventDefault();
    edituser(data.id,data.firstname,data.lastname,data.address,data.email);
    refclose.current.click();
    swal("Updated Data", " ", "success");
    
   };

  return (
    <>
    <button ref={ref} hidden={true} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModalupdate">
  
    </button>
       <div className="modal fade" id="exampleModalupdate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
          <div className="display-6 text-center my-1"><strong>Medi</strong>Store Update </div>
          
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refclose} ></button>
          </div>
          <div className="modal-body">
          
          <form className="container row g-3 needs-validation" onSubmit={handleclick}>
      <div className="col-md-4">
        <label htmlFor="validationCustom01" className="form-label">First name</label>
        <input type="text" className="form-control" id="validationCustom01" name="firstname" value={data.firstname} onChange={onchange} required/>
        <div className="valid-feedback">
          Looks good!
        </div>
      </div>
      <div className="col-md-4">
        <label htmlFor="validationCustom02" className="form-label">Last name</label>
        <input type="text" className="form-control" id="validationCustom02"  required name="lastname" value={data.lastname} onChange={onchange}/>
        <div className="valid-feedback">
          Looks good!
        </div>
      </div>
      <div className=" mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
        <div className="col-md-8">
          <input  type="email" className="form-control" id="inputEmail3" name="email"  value={data.email} onChange={onchange} required/>
        </div>
      </div>
      <div className="col-md-4">
        <label htmlFor="validationCustom03" className="form-label">Address</label>
        <input type="text" className="form-control" id="validationCustom03"  name="address" value={data.address} onChange={onchange}required/>
        <div className="invalid-feedback">
          Please provide a valid address.
        </div>
      </div>
      <div className="col-12">
        <button className="btn btn-primary" type="submit">Update</button>
      </div>
    </form>
          </div>
        </div>
      </div>
    </div>

      {localStorage.getItem('admin')?<div className="text-center my-1" style={{"color":"red"}}>Loggined as ADMIN </div>:[]}
      <div>
          <h4 className="display-6 my-2"><strong>User </strong>Details</h4>
      <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">Firstname</th>
          <th scope="col">Lastname</th>
          <th scope="col">Email</th>
          <th scope="col">Address</th>
          <th scope="col">Date Registered</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
      {allusers.map(user => {
        
              return <Rowitems data={user} key={user._id} update={Update}/>;
              })}
      </tbody>
    </table>
        </div>
            
            </>
  )
}
