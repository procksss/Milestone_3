import React from 'react'
import AuthContext from "../context/auths/AuthContext";
import { useContext, useEffect } from "react";
import swal from 'sweetalert';
export default function Orderpage() {
    const context = useContext(AuthContext);
    const { getitems, useritems,deleteitem} = context;
    useEffect(() => {
      getitems();
    }, []);


    const handledelete = async(id)=>{
      await swal({
        title: "Are you sure?",
        text: "Once Canceled, you will not be able to grab this offer!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          deleteitem(id);
          swal("Poof! Your order has been canceled!", {
            icon: "success",
          });
        } else {
          swal("Your order is safe!");
        }
      });
    }


  return (
    <>
    <div className="container">
    <h1 className="display-3 m-2 text-center"><strong>Orders/Invoices</strong></h1>

    {useritems.map((item) => {
        return (
            <div key={item._id}>
            <div className="card m-3 text-bg-dark " >
        </div>
        <div className="card-body">
          <h5 className="card-title"><strong>Name :</strong>{item.medicinename}</h5>
          <p className="card-text"><strong>Id :</strong>{item.medicineid}</p>
          <button href="#" className="btn btn-primary" onClick={()=>handledelete(item._id)}>Cancel Order</button>
        </div>
        <div className="d-flex mb-3">
        <div className="ms-auto p-2"><button type="button" className="btn btn-danger btn-lg">Price : {item.price}</button></div></div>
      </div>
      
        )})}
        </div>
        </>
  )
}
