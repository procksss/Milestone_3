
import React, { useEffect, useRef }  from "react";
import AuthContext from "../context/auths/AuthContext";
import { useContext,useState } from "react";
import Rowitems from "./Rowitems";
import { useNavigate } from "react-router";
import swal from "sweetalert";

export default function Medicine() {
    const ref =useRef(null)
    const refclose =useRef(null)
    const context = useContext(AuthContext);
    const {getallitems,allitems,editallitem,deleteallitem} = context;
    const [data, setdata] = useState({medicineid : "",medicinename :"",price:"", id: ""});
    useEffect(() => {
        getallitems();
      }, []);
      
    // const alldata= allitems;
  
    const Update = (item) =>{
      setdata({medicineid : item.medicineid ,medicinename : item.medicinename,price: item.price, id : item._id})
      ref.current.click();
  
    }
    const onchange =(e)=>{
      setdata({ ...data, [e.target.name]: e.target.value });
    };
  
    const handleclick =(e)=>{
      e.preventDefault();
      editallitem(data.medicineid,data.medicinename,data.price,data.id);
      refclose.current.click();
      swal("Updated Data", " ", "success");
      
     };


  return (
          <>
    <button ref={ref} hidden={true} type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#medsModalupdate">
  
    </button>
       <div className="modal fade" id="medsModalupdate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
          <div className="display-6 text-center my-1"><strong>Medi</strong>Store Update </div>
          
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refclose} ></button>
          </div>
          <div className="modal-body">
          
          <form className="container row g-3 needs-validation" onSubmit={handleclick}>
      <div className="mb-3">
        <label htmlFor="validationCustom01" className="form-label">id</label>
        <input type="text" className="form-control" id="validationCustom01" name="medicineid" value={data.medicineid} onChange={onchange} required/>
        <div className="valid-feedback">
          Looks good!
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="validationCustom02" className="form-label">Medicine Name</label>
        <input type="text" className="form-control" id="validationCustom02"  required name="medicinename" value={data.medicinename} onChange={onchange}/>
        <div className="valid-feedback">
          Looks good!
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="validationCustom03" className="form-label">Price</label>
        <input type="text" className="form-control" id="validationCustom03"  name="price" value={data.price} onChange={onchange}required/>
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
          <th scope="col">id</th>
          <th scope="col">Medicine Name</th>
          <th scope="col">Price</th>
          <th scope="col">Date Registered</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
      {allitems.map(item => {
        
              return (<tr>
         
                <td>{item.medicineid}</td>
                <td>{item.medicinename}</td>
                <td>{item.price}</td>
                <td>{item.date}</td>
                <td><i className="fa-solid fa-trash mx-2"  onClick={()=>{deleteallitem(item._id)}}></i>
              <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>Update(item)}></i></td>
              </tr>);
              })}
      </tbody>
    </table>
        </div>
    </>
  )
}
