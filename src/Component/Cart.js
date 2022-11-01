import React from 'react'
import AuthContext from "../context/auths/AuthContext";
import { useContext, useState } from "react";
import swal from 'sweetalert';
import { useNavigate } from "react-router";

export default function Cart() {
    const context = useContext(AuthContext);
    const {setcart,cart,createitems} = context;
const navigate = useNavigate();
const myfunction =(item)=> {
var filteredItems = cart.filter(function(value)
  {
      return value!=item;
  });
  setcart(filteredItems);
}
const handlebuy = ()=>{
    cart.map((item)=>{return(createitems(item.medicineid,item.medicinename,item.price))})
    swal("Good job!", "Ordered Successfully!", "success");
    navigate('/orderpage')

}
  return (
    <>
    {cart.map((item) => {
        return (
            <div>
            <div className="card">
        </div>
        <div className="card-body my-3">
          <h5 className="card-title"><strong>Id :</strong>{item.medicineid}</h5>
          <p className="card-text"><strong>Name :</strong>{item.medicinename}</p>
          <button href="#" className="btn btn-primary" onClick={()=>{myfunction(item)}} >delete</button>
        </div>
        <div className="d-flex mb-3">
        <div className="ms-auto p-2"><button type="button" className="btn btn-danger btn-lg" onClick={handlebuy}>Price : {item.price}</button></div></div>
      </div>
        )})}
        <div className="d-flex mb-3">

  <div className="ms-auto p-2"><button type="button" className="btn btn-primary btn-lg" onClick={handlebuy}>Buy Now</button></div>
</div>
        

        </>

  )
}
